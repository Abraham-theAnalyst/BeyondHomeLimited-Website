"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { connectionConstrained } from "@/components/ui/hero-video";
import { cn } from "@/lib/utils";

/**
 * The homepage hero sequence for phones — same chapters as desktop.
 *
 * Loading ladder: clip 1 arms after the load event + first view; clip N+1
 * starts fetching once clip N passes 50% of its duration; the crossfade
 * happens only after the next clip fires canplaythrough. If it is not
 * ready when the current clip ends, the current clip replays and the
 * advance fires the moment readiness arrives — never a stall, never a
 * black frame (the art-directed poster always sits beneath, and a clip
 * only gains opacity after its first `playing` event). Only the current
 * and next clip keep their sources; earlier ones are released after the
 * fade.
 *
 * Degrading is deliberate, not trigger-happy: data-saver / 2g / slow-2g
 * (re-evaluated on every connection `change`, so the sequence RESUMES if
 * conditions improve) or two consecutive failed clip loads. A single
 * stall or momentary hiccup is treated as transient.
 *
 * Instrumentation: open the page with ?herodebug=1 and every load, play,
 * transition, buffer state and fallback decision logs to the console.
 */
const CLIPS = [
  "night-roundabout-m",
  "orijin-led-night-m",
  "fmn-wrap-drone-m",
  "indoor-walkthrough", // already portrait and lightweight
];

/** A clip gets this long to reach canplaythrough before the attempt
    counts as a failed load (two consecutive failures degrade). */
const FETCH_TIMEOUT_MS = 20_000;
/** How long a superseded clip keeps its sources after the crossfade. */
const RELEASE_AFTER_MS = 1_800;

function bufInfo(v: HTMLVideoElement | null): string {
  if (!v) return "no element";
  const ranges: string[] = [];
  for (let j = 0; j < v.buffered.length; j++) {
    ranges.push(`${v.buffered.start(j).toFixed(1)}–${v.buffered.end(j).toFixed(1)}s`);
  }
  return `readyState=${v.readyState} buffered=[${ranges.join(", ")}] t=${v.currentTime.toFixed(1)}/${(v.duration || 0).toFixed(1)}s`;
}

export function MobileHeroSequence() {
  const reduce = useReducedMotion();
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);

  const [debug] = useState(
    () =>
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("herodebug") === "1"
  );
  const dbg = useCallback(
    (...args: unknown[]) => {
      if (debug) console.info("[hero]", ...args);
    },
    [debug]
  );

  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [constrained, setConstrained] = useState(
    () => typeof navigator !== "undefined" && connectionConstrained()
  );
  const [degraded, setDegraded] = useState(false);
  /** which clips currently have <source> children mounted */
  const [withSources, setWithSources] = useState<number[]>([0]);
  /** clips that have fired `playing` — only these may be visible */
  const [started, setStarted] = useState<ReadonlySet<number>>(new Set());

  const ready = useRef<boolean[]>([]); // canplaythrough per clip
  const pendingAdvance = useRef(false);
  const failCount = useRef(0);
  const fetchTimer = useRef<{ idx: number; id: ReturnType<typeof setTimeout> } | null>(null);
  const releaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sequence = !constrained && !degraded;
  const nextIdx = (active + 1) % CLIPS.length;

  const clearFetchTimer = useCallback((idx?: number) => {
    if (fetchTimer.current && (idx === undefined || fetchTimer.current.idx === idx)) {
      clearTimeout(fetchTimer.current.id);
      fetchTimer.current = null;
    }
  }, []);

  const degradedRef = useRef(false);

  /** One failed load is transient (retry); two in a row degrade. */
  const registerLoadFailure = useCallback(
    (idx: number, reason: string) => {
      if (degradedRef.current) return; // already degraded — late errors are noise
      clearFetchTimer(idx);
      failCount.current += 1;
      dbg(`clip load FAILED (${CLIPS[idx]}): ${reason} — consecutive failures: ${failCount.current}`);
      if (failCount.current >= 2) {
        dbg("FALLBACK: two consecutive failed loads → looping the current clip only");
        degradedRef.current = true;
        setDegraded(true);
        return;
      }
      const v = refs.current[idx];
      if (v) {
        dbg(`retrying load (${CLIPS[idx]})`);
        v.load();
        fetchTimer.current = {
          idx,
          // a timed-out retry IS the second consecutive failure
          id: setTimeout(() => {
            if (degradedRef.current) return;
            fetchTimer.current = null;
            failCount.current += 1;
            dbg(
              `clip load FAILED (${CLIPS[idx]}): retry got no canplaythrough within ${FETCH_TIMEOUT_MS / 1000}s`
            );
            dbg("FALLBACK: two consecutive failed loads → looping the current clip only");
            degradedRef.current = true;
            setDegraded(true);
          }, FETCH_TIMEOUT_MS),
        };
      }
    },
    [clearFetchTimer, dbg]
  );

  /** Mount the next clip's sources; the reconcile effect starts the fetch. */
  const requestNext = useCallback(() => {
    setWithSources((cur) => {
      if (cur.includes(nextIdx)) return cur;
      dbg(`50% of ${CLIPS[active]} reached → preloading ${CLIPS[nextIdx]}`);
      return [...cur, nextIdx];
    });
  }, [active, nextIdx, dbg]);

  const advance = useCallback(() => {
    pendingAdvance.current = false;
    const nv = refs.current[nextIdx];
    dbg(`ADVANCE ${CLIPS[active]} → ${CLIPS[nextIdx]} | next: ${bufInfo(nv)}`);
    setActive(nextIdx);
  }, [active, nextIdx, dbg]);

  // Arm after the load event + first view, so nothing competes with LCP.
  useEffect(() => {
    if (reduce) return;
    let io: IntersectionObserver | undefined;
    const el = wrapRef.current;
    const watch = () => {
      if (!el) return;
      io = new IntersectionObserver(
        (entries) => {
          setVisible(entries[0].isIntersecting);
          if (entries[0].isIntersecting) setArmed(true);
        },
        { threshold: 0.15 }
      );
      io.observe(el);
    };
    if (document.readyState === "complete") watch();
    else window.addEventListener("load", watch, { once: true });
    return () => {
      window.removeEventListener("load", watch);
      io?.disconnect();
    };
  }, [reduce]);

  // One arming log with the detected connection.
  useEffect(() => {
    if (!armed) return;
    const conn = (
      navigator as Navigator & { connection?: { effectiveType?: string; saveData?: boolean } }
    ).connection;
    dbg(
      `armed | sequence=${CLIPS.join(" → ")} | effectiveType=${conn?.effectiveType ?? "unknown"} saveData=${conn?.saveData ?? false} constrained=${constrained} degraded=${degraded}`
    );
    // arming snapshot only — mode changes log where they happen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [armed, dbg]);

  // Re-evaluate the connection on every change: constrain when it drops,
  // RESUME the sequence (and forgive past failures) when it improves.
  useEffect(() => {
    const conn = (
      navigator as Navigator & {
        connection?: EventTarget & { effectiveType?: string; saveData?: boolean };
      }
    ).connection;
    if (!conn?.addEventListener) return;
    const onChange = () => {
      const c = connectionConstrained();
      dbg(
        `connection change: effectiveType=${conn.effectiveType} saveData=${conn.saveData} → ${
          c ? "constrained (holding current clip)" : "unconstrained"
        }`
      );
      setConstrained(c);
      if (!c) {
        failCount.current = 0;
        degradedRef.current = false;
        setDegraded(false);
        dbg("conditions improved → sequence resumed, failure count reset");
      }
    };
    conn.addEventListener("change", onChange);
    return () => conn.removeEventListener("change", onChange);
  }, [dbg]);

  // Reconcile <video> elements with withSources: start fetches for newly
  // permitted clips, flush the buffers of released ones.
  useEffect(() => {
    if (!armed) return;
    refs.current.forEach((v, i) => {
      if (!v) return;
      const should = withSources.includes(i);
      // IDLE or LOADING = holds/fetching a resource; EMPTY or NO_SOURCE = flushed
      const has =
        v.networkState === HTMLMediaElement.NETWORK_IDLE ||
        v.networkState === HTMLMediaElement.NETWORK_LOADING;
      if (should && !has) {
        dbg(`fetch start (${CLIPS[i]})`);
        v.load();
        if (i === active) {
          v.play().catch(() => {
            /* expected pre-buffer; onCanPlay retries */
          });
        } else {
          clearFetchTimer();
          fetchTimer.current = {
            idx: i,
            id: setTimeout(
              () => registerLoadFailure(i, `no canplaythrough within ${FETCH_TIMEOUT_MS / 1000}s`),
              FETCH_TIMEOUT_MS
            ),
          };
        }
      }
      if (!should && has) {
        v.pause();
        v.load(); // sources are unmounted; this flushes the buffer
        ready.current[i] = false;
        clearFetchTimer(i);
        dbg(`released (${CLIPS[i]}) — buffer flushed`);
      }
    });
  }, [armed, withSources, active, clearFetchTimer, registerLoadFailure, dbg]);

  // Play/pause with viewport + tab visibility.
  useEffect(() => {
    if (!armed) return;
    const sync = () => {
      if (!visible || document.hidden) {
        refs.current.forEach((x) => x?.pause());
        dbg("paused (offscreen or tab hidden)");
      } else {
        const v = refs.current[active];
        if (v && v.currentSrc) v.play().catch(() => {});
      }
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [armed, visible, active, dbg]);

  // After a crossfade settles, keep only current + next in memory.
  useEffect(() => {
    if (!armed) return;
    const keep = active;
    const keepNext = (active + 1) % CLIPS.length;
    if (releaseTimer.current) clearTimeout(releaseTimer.current);
    releaseTimer.current = setTimeout(() => {
      setWithSources((cur) => {
        const kept = cur.filter((i) => i === keep || i === keepNext);
        return kept.length === cur.length ? cur : kept;
      });
    }, RELEASE_AFTER_MS);
    return () => {
      if (releaseTimer.current) clearTimeout(releaseTimer.current);
    };
  }, [active, armed]);

  if (reduce) return null;

  return (
    <div ref={wrapRef} className="absolute inset-0" aria-hidden>
      {CLIPS.map((base, i) => (
        <video
          key={base}
          ref={(el) => {
            refs.current[i] = el;
          }}
          muted
          playsInline
          {...{ "webkit-playsinline": "true" }}
          autoPlay={i === 0}
          loop={!sequence}
          preload="auto"
          onLoadStart={() => dbg(`loadstart (${base})`)}
          onCanPlay={(e) => {
            if (i === active && visible && !document.hidden)
              e.currentTarget.play().catch(() => {});
          }}
          onCanPlayThrough={(e) => {
            if (ready.current[i]) return;
            ready.current[i] = true;
            failCount.current = 0;
            clearFetchTimer(i);
            dbg(`canplaythrough (${base}) | ${bufInfo(e.currentTarget)}`);
            if (pendingAdvance.current && i === nextIdx) {
              dbg(`deferred advance: ${base} became ready mid-replay`);
              advance();
            }
          }}
          onPlaying={() => {
            setStarted((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
            dbg(`playing (${base})`);
          }}
          onTimeUpdate={(e) => {
            if (i !== active || !sequence) return;
            const v = e.currentTarget;
            if (v.duration > 0 && v.currentTime >= v.duration / 2) requestNext();
          }}
          onEnded={() => {
            if (i !== active || !sequence) return;
            if (ready.current[nextIdx]) {
              advance();
            } else {
              pendingAdvance.current = true;
              dbg(
                `${base} ended but ${CLIPS[nextIdx]} not ready — replaying current | next: ${bufInfo(refs.current[nextIdx])}`
              );
              const v = refs.current[i];
              if (v) {
                v.currentTime = 0;
                v.play().catch(() => {});
              }
            }
          }}
          onError={(e) => {
            const err = e.currentTarget.error;
            const reason = `media error code=${err?.code ?? "?"} ${err?.message ?? ""}`.trim();
            if (i === active && ready.current[nextIdx]) {
              dbg(`active clip errored (${base}: ${reason}) — advancing early`);
              advance();
            } else {
              registerLoadFailure(i, reason);
            }
          }}
          onStalled={() => dbg(`stalled (${base}) — transient, ignored`)}
          onWaiting={() => dbg(`waiting for data (${base}) — transient`)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-slow ease-in-out",
            armed && i === active && started.has(i) ? "opacity-100" : "opacity-0"
          )}
        >
          {armed && withSources.includes(i) && (
            <>
              <source src={`/hero/${base}.mp4`} type="video/mp4" />
              <source src={`/hero/${base}.webm`} type="video/webm" />
            </>
          )}
        </video>
      ))}
    </div>
  );
}
