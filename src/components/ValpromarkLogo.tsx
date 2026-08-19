import React from 'react';

interface ValpromarkLogoProps {
  variant?: 'full' | 'icon' | 'compact';
  className?: string;
  theme?: 'auto' | 'light' | 'dark' | 'gold-on-navy';
  size?: 'sm' | 'md' | 'lg';
}

export function ValpromarkLogo({
  variant = 'full',
  className = '',
  size = 'md',
}: ValpromarkLogoProps) {
  // Sizing styles
  const iconSize = size === 'sm' ? 32 : size === 'lg' ? 52 : 40;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Vector Emblem matching the provided brand logo */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm"
      >
        <defs>
          {/* Metallic Rich Gold Gradient */}
          <linearGradient id="valproGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9E29D" />
            <stop offset="25%" stopColor="#DFB24A" />
            <stop offset="50%" stopColor="#C5A059" />
            <stop offset="75%" stopColor="#E5C158" />
            <stop offset="100%" stopColor="#A87A2A" />
          </linearGradient>

          {/* Platinum / Silver accent gradient for building facade */}
          <linearGradient id="valproPlatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Luxury Deep Navy Background for Emblem */}
          <radialGradient id="valproNavyGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#132742" />
            <stop offset="100%" stopColor="#0A1626" />
          </radialGradient>
        </defs>

        {/* Circular Background */}
        <circle cx="100" cy="100" r="94" fill="url(#valproNavyGrad)" />

        {/* Outer Circular Gold Ring */}
        <circle
          cx="100"
          cy="100"
          r="92"
          stroke="url(#valproGoldGrad)"
          strokeWidth="6"
          fill="none"
        />

        {/* Stylized 'V' and 'E' Luxury Monogram Architecture */}
        <g transform="translate(18, 22) scale(0.82)">
          {/* Top 'V' Left Arm & Right Arm */}
          <path
            d="M 40 25 L 98 120 L 112 95 L 75 25 Z"
            fill="url(#valproGoldGrad)"
          />
          <path
            d="M 125 25 L 102 70 L 118 96 L 158 25 Z"
            fill="url(#valproGoldGrad)"
          />

          {/* Skyscraper Buildings rising in the center / 'VE' structure */}
          {/* Left Tower (Gold / Platinum) */}
          <path
            d="M 50 140 L 50 68 L 68 52 L 68 140 Z"
            fill="url(#valproPlatGrad)"
          />
          {/* Center High-rise Tower */}
          <path
            d="M 72 140 L 72 42 L 95 62 L 95 140 Z"
            fill="url(#valproGoldGrad)"
          />
          {/* Right Tower */}
          <path
            d="M 100 140 L 100 70 L 118 84 L 118 140 Z"
            fill="url(#valproPlatGrad)"
          />
          {/* E Horizontal Bars (Essence Architecture) */}
          <path
            d="M 124 38 L 175 38 L 170 52 L 124 52 Z"
            fill="url(#valproGoldGrad)"
          />
          <path
            d="M 124 72 L 165 72 L 160 86 L 124 86 Z"
            fill="url(#valproGoldGrad)"
          />
          <path
            d="M 124 104 L 175 104 L 168 118 L 124 118 Z"
            fill="url(#valproPlatGrad)"
          />

          {/* Dynamic Swirling Base Wave (Real Estate Growth & Prosperity) */}
          <path
            d="M 35 148 C 75 125, 120 162, 172 135 C 155 160, 95 168, 35 148 Z"
            fill="url(#valproGoldGrad)"
          />
        </g>
      </svg>

      {/* Brand Typography */}
      {variant !== 'icon' && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-serif tracking-[0.14em] font-extrabold uppercase bg-gradient-to-r from-[#DFB24A] via-[#C5A059] to-[#E5C158] bg-clip-text text-transparent ${
                size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl'
              }`}
            >
              VALPROMARK
            </span>
          </div>

          {variant === 'full' && (
            <>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="h-[0.5px] w-2 bg-[#C5A059]/60" />
                <span className="text-[7.5px] sm:text-[8px] font-bold tracking-[0.18em] uppercase text-neutral-600 dark:text-[#C5A059]/90 whitespace-nowrap">
                  ESSENCE MANAGEMENT SERVICES LTD
                </span>
                <div className="h-[0.5px] w-2 bg-[#C5A059]/60" />
              </div>
              <span className="text-[6.5px] tracking-[0.25em] uppercase text-[#C5A059] font-medium hidden sm:block">
                MANAGE · GROW · SUCCEED
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
