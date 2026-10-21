import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { useInView } from "./useInView";

const navy = "var(--p-navy)";

type Props = {
  /** Google Drive file id of a video shared with "anyone with the link". */
  videoId: string;
  /**
   * Locally bundled poster frame. Drive's own thumbnail endpoint 302s to a
   * short-lived googleusercontent URL that fails when loaded cross-origin,
   * so the frame is committed as an asset rather than hotlinked.
   */
  poster: string;
  /** Intrinsic ratio of the recording, so the poster is never cropped. */
  aspectRatio?: string;
  /** Canonical Drive share link, offered as a fallback below the frame. */
  href: string;
  /** Accessible title for the player, also used for the poster alt text. */
  title: string;
  caption?: string;
  className?: string;
};

/**
 * Click-to-play wrapper around a Google Drive video embed.
 *
 * The Drive player is a heavyweight third-party iframe, so it is never mounted
 * on load: a lightweight poster frame stands in until the visitor presses
 * play. The poster image itself only starts fetching once the block nears the
 * viewport, so a visitor who never scrolls this far pays nothing for it.
 */
export function DriveVideo({
  videoId,
  poster,
  aspectRatio = "16 / 9",
  href,
  title,
  caption,
  className = "",
}: Props) {
  const [ref, near] = useInView<HTMLDivElement>("300px");
  const [playing, setPlaying] = useState(false);

  return (
    <figure className={`m-0 ${className}`}>
      <div
        ref={ref}
        className="relative w-full overflow-hidden border-2"
        style={{ aspectRatio, borderColor: navy }}
      >
        {playing ? (
          <iframe
            title={title}
            src={`https://drive.google.com/file/d/${videoId}/preview`}
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 w-full h-full cursor-pointer"
            style={{ backgroundColor: "rgba(10,26,94,0.06)", border: 0, padding: 0 }}
          >
            {near && (
              <img
                src={poster}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <span
              aria-hidden
              className="absolute inset-0 transition-opacity duration-300 opacity-60 group-hover:opacity-80"
              style={{ backgroundColor: navy }}
            />
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center"
            >
              <span
                className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full transition-transform duration-300 ease-out group-hover:scale-110"
                style={{
                  backgroundColor: "var(--p-cream-soft)",
                  color: navy,
                  boxShadow: "0 6px 24px rgba(10,26,94,0.35)",
                }}
              >
                <Play size={28} fill={navy} className="ml-1" />
              </span>
            </span>
          </button>
        )}
      </div>

      <figcaption
        className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm"
        style={{ color: navy }}
      >
        {caption && <span style={{ opacity: 0.85 }}>{caption}</span>}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-[var(--p-gold)]"
          style={{ fontWeight: 600 }}
        >
          <span>Open in Google Drive</span>
          <ExternalLink
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </a>
      </figcaption>
    </figure>
  );
}
