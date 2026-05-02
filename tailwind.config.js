/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,mdx}",
    "./components/**/*.{js,jsx,mdx}",
    "./pages/**/*.{js,jsx,mdx}",
    "./src/app/**/*.{js,jsx,mdx}",
    "./src/components/**/*.{js,jsx,mdx}",
    "./src/pages/**/*.{js,jsx,mdx}",
  ],

  darkMode: "class",

  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
      "2xl": "1440px",
    },

    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "3rem",
      },
      screens: {
        xl: "1200px",
      },
    },

    extend: {
      colors: {
        primary: "#13ec92",
        "primary-dark": "#0fbf78",
        "primary-light": "rgba(19,236,146,0.15)",

        "background-light": "#f6f8f7",
        "background-off": "#eef4ff",
        "background-soft": "#eafaf3",
        "background-dark": "#10221a",

        "text-main": "#0f172a",
        "text-muted": "#64748b",

        "border-subtle": "#dbe6e1",
        "gold-subtle": "rgba(212,175,55,0.3)",

        surface: "#ffffff",
      },

      fontFamily: {
        display: ["Manrope", "sans-serif"],
        sans: ["Manrope", "sans-serif"],
      },

      borderRadius: {
        DEFAULT: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
        full: "9999px",
      },

      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.06)",
        float: "0 12px 40px rgba(0,0,0,0.12)",
        card: "0 10px 30px rgba(0,0,0,0.08)",
        button: "0 10px 24px rgba(19,236,146,0.25)",
      },

      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        blob: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.08)" },
        },
      },

      animation: {
        marquee: "marquee 30s linear infinite",
        fadeUp: "fadeUp 0.5s ease-out forwards",
        blob: "blob 12s ease-in-out infinite",
      },
    },
  },

  safelist: [
    "animate-fadeUp",
    "animate-blob",
    "animate-marquee",
  ],

  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};
