// Decorative herb sprig drawn inline so it inherits `currentColor` and needs no
// asset request. Purely ornamental — always hidden from assistive tech.

const LEAF_COUNT = 5;

export default function BotanicalMark({
  className = "",
  flip = false,
}: {
  className?: string;
  /** Mirror the sprig, so a pair can frame a block. */
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 120 200"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`${flip ? "-scale-x-100 " : ""}${className}`}
    >
      <path
        d="M60 196C60 150 54 108 58 74C61 46 70 24 78 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {Array.from({ length: LEAF_COUNT }, (_, i) => {
        // Leaves shrink as they climb the stem, which drifts slightly right.
        const y = 166 - i * 33;
        const stemX = 58 + i * 3;
        const rx = 25 - i * 3.6;
        const ry = 10 - i * 1.2;
        const left = { x: stemX - rx * 0.9, y: y - 5 };
        const right = { x: stemX + rx * 0.9, y };

        return (
          <g key={i} fill="currentColor">
            <ellipse
              cx={left.x}
              cy={left.y}
              rx={rx}
              ry={ry}
              transform={`rotate(-24 ${left.x} ${left.y})`}
            />
            <ellipse
              cx={right.x}
              cy={right.y}
              rx={rx}
              ry={ry}
              transform={`rotate(24 ${right.x} ${right.y})`}
            />
          </g>
        );
      })}
      <circle cx="79" cy="7" r="4" fill="currentColor" />
    </svg>
  );
}
