/**
 * Horizon and custom back-view developer silhouette looking up at the starry sky.
 */
export function SilhouetteScene() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 select-none"
      aria-hidden="true"
    >
      {/* Horizon backlight behind silhouette so the dark figure pops cleanly */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[560px] h-[340px]"
        style={{
          background:
            'radial-gradient(ellipse at center 68%, rgba(96, 165, 250, 0.36) 0%, rgba(99, 102, 241, 0.14) 44%, transparent 72%)',
        }}
      />

      {/* Curved night-sky hill */}
      <svg
        viewBox="0 0 1440 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-[110px] sm:h-[135px] md:h-[155px] block"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="horizonGround" x1="720" y1="30" x2="720" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#090e26" />
            <stop offset="100%" stopColor="#02030a" />
          </linearGradient>
        </defs>
        <path
          d="M0 112C240 72 460 90 700 58C940 26 1190 66 1440 96V160H0V112Z"
          fill="#06091a"
          opacity="0.85"
        />
        <path
          d="M0 128C280 102 520 62 720 62C940 62 1200 102 1440 124V160H0V128Z"
          fill="url(#horizonGround)"
        />
      </svg>

      {/* Standing silhouette planted on the hill crest, looking up at the sky */}
      <img
        src="/silhouette.png"
        alt=""
        className="absolute z-20 bottom-[32px] sm:bottom-[42px] md:bottom-[48px] left-1/2 -translate-x-1/2 h-[155px] sm:h-[185px] md:h-[205px] w-auto object-contain drop-shadow-[0_0_16px_rgba(96,165,250,0.3)]"
      />
    </div>
  );
}
