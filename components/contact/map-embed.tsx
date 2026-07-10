"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

/**
 * Keyless Google Maps embed for Ogba, Ikeja, toned toward the site's
 * monochrome. Loads only when scrolled near; until then (and for anyone
 * whose browser blocks the frame) a styled fallback carries the address
 * and a link out to Google Maps.
 */
export function MapEmbed() {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative aspect-[16/9] overflow-hidden border border-[var(--hairline)] bg-coal md:aspect-[21/9]">
      {/* fallback layer: address + link out, visible until the frame paints */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <MapPin size={20} aria-hidden className="text-gold" />
        <p className="text-body text-mist">Ogba, Ikeja, Lagos, Nigeria</p>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Ogba,+Ikeja,+Lagos"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline text-sm text-paper"
        >
          Open in Google Maps
        </a>
      </div>
      {load && (
        <>
          <iframe
            title="Map of Ogba, Ikeja, Lagos — Beyond Home Limited"
            src="https://www.google.com/maps?q=Ogba,+Ikeja,+Lagos,+Nigeria&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_contrast(0.92)_brightness(0.88)]"
          />
          {/* ink vignette so the embed sits inside the page, not on it */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              boxShadow: "inset 0 0 90px 30px rgba(10,10,10,0.85)",
            }}
          />
        </>
      )}
    </div>
  );
}
