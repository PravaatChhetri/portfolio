import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "surface-bright": "#3a3939",
        primary: "#ffffff",
        secondary: "#c8c6c6",
        "secondary-container": "#474747",
        "primary-container": "#d4d4d4",
        "surface-container": "#201f1f",
        surface: "#131313",
        "surface-variant": "#353534",
        "surface-container-high": "#2a2a2a",
        "surface-container-highest": "#353534",
        "surface-container-low": "#1c1b1b",
        "surface-container-lowest": "#0e0e0e",
        background: "#131313",
        "on-surface": "#e5e2e1",
        "on-primary": "#1a1c1c",
        "on-background": "#e5e2e1",
        "outline-variant": "#474747",
        "surface-dim": "#131313",
        outline: "#919191",
        "surface-tint": "#c6c6c6",
      },
      borderRadius: {
        DEFAULT: "0px",
        lg: "0px",
        xl: "0px",
        full: "9999px",
      },
      fontFamily: {
        headline: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        label: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      letterSpacing: {
        terminal: "0.1em",
        blueprint: "0.2em",
        void: "0.4em",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "line-grow": "lineGrow 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        lineGrow: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
