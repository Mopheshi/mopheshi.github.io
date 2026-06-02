import portraitImg from "../../../imports/ndachimya.webp";

const NAVY = "var(--p-navy)";

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 60" fill="none" aria-hidden>
      <path
        d="M30 4 L33 27 L56 30 L33 33 L30 56 L27 33 L4 30 L27 27 Z"
        fill={NAVY}
      />
      <path
        d="M50 8 L51.5 14 L57 15.5 L51.5 17 L50 23 L48.5 17 L43 15.5 L48.5 14 Z"
        fill={NAVY}
      />
    </svg>
  );
}

export function Scribble({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 30" fill="none" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1={5 + i * 18}
          y1={5}
          x2={i * 18}
          y2={25}
          stroke={NAVY}
          strokeWidth={2}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

const BLOB_PATH =
  "M250,40 C330,30 410,70 450,140 C495,215 480,310 425,370 C375,425 285,460 205,440 C115,420 50,355 35,265 C20,180 60,100 130,65 C170,45 210,42 250,40 Z";

export function Portrait() {
  return (
    <>
      <span className="sr-only">Portrait of Ndachimya Edward</span>
      <div
        className="relative w-full aspect-square"
        role="img"
        aria-label="Portrait of Ndachimya Edward"
      >
        <svg
          viewBox="0 0 500 500"
          className="absolute inset-0 w-full h-full"
          aria-hidden
        >
          <defs>
            <clipPath id="blobClip">
              <path d={BLOB_PATH} />
            </clipPath>
          </defs>
          <image
            href={portraitImg}
            x="0"
            y="0"
            width="500"
            height="500"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#blobClip)"
          />
          <path
            d={BLOB_PATH}
            fill="none"
            stroke={NAVY}
            strokeWidth={1.25}
            transform="translate(14,12)"
          />
        </svg>
      </div>
    </>
  );
}

