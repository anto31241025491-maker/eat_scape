import React from 'react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 120, showText = false, className = "" }: LogoProps) {
  const orange = "#FF7F27";
  const green = "#84BD3A";
  const stroke = "#321E1E";

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow */}
        <ellipse cx="100" cy="180" rx="40" ry="10" fill="#E8E2E2" />

        {/* Feet */}
        <rect x="80" y="165" width="20" height="15" rx="7.5" fill={green} stroke={stroke} strokeWidth="4" />
        <rect x="100" y="165" width="20" height="15" rx="7.5" fill={green} stroke={stroke} strokeWidth="4" />

        {/* Body (Pin) */}
        <path
          d="M100 170L65 130C50 110 50 80 70 60C90 40 120 40 140 60C160 80 160 110 145 130L100 170Z"
          fill={orange}
          stroke={stroke}
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* Leaf on top */}
        <path
          d="M110 40C110 40 135 25 130 50C125 75 110 65 110 65"
          fill={green}
          stroke={stroke}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path d="M110 40L120 50" stroke={stroke} strokeWidth="3" strokeLinecap="round" />

        {/* Face White Circle */}
        <circle cx="100" cy="95" r="35" fill="white" stroke={stroke} strokeWidth="4" />

        {/* Eyes */}
        <circle cx="85" cy="95" r="5" fill={stroke} />
        {/* Winking Eye */}
        <path d="M110 95C110 93 115 93 120 95" stroke={stroke} strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Mouth */}
        <path
          d="M92 110C92 110 100 118 108 110"
          stroke={stroke}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M96 112L104 112" stroke="#FF9999" strokeWidth="2" strokeLinecap="round" />

        {/* Blush */}
        <circle cx="75" cy="105" r="3" fill="#FFBABA" />
        <circle cx="125" cy="105" r="3" fill="#FFBABA" />

        {/* Spoon (Left) */}
        <g transform="translate(30, 80) rotate(-10)">
          <path d="M10 40L10 60" stroke={stroke} strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="10" cy="30" rx="12" ry="18" fill={green} stroke={stroke} strokeWidth="4" />
          <path d="M10 50C18 50 25 55 25 60" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
          <circle cx="25" cy="60" r="10" fill="white" stroke={stroke} strokeWidth="4" />
        </g>

        {/* Fork (Right) */}
        <g transform="translate(145, 80) rotate(10)">
          <path d="M15 40L15 60" stroke={stroke} strokeWidth="6" strokeLinecap="round" />
          {/* Fork Head */}
          <path
            d="M5 20V35C5 45 25 45 25 35V20M10 20V30M15 20V30M20 20V30"
            fill={green}
            stroke={stroke}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M15 50C7 50 0 55 0 60" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
          <circle cx="0" cy="60" r="10" fill="white" stroke={stroke} strokeWidth="4" />
        </g>
      </svg>

      {showText && (
        <div className="mt-4 flex font-display font-black text-4xl italic">
          <span style={{ color: green }}>Eat</span>
          <span style={{ color: orange }}>scape</span>
        </div>
      )}
    </div>
  );
}
