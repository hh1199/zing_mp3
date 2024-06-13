/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      backgroundColor: {
        "main-100": "#E7ECEC",
        "main-200": "#DDE4E4",
        "main-300": "#CED9D9",
        "main-400": "#C0D8D8",
        "main-500": "#0E8080",
        "overlay-30": "rgba(0,0,0,0.3)",
      },
      colors: {
        "main-100": "#E7ECEC",
        "main-200": "#DDE4E4",
        "main-300": "#CED9D9",
        "main-400": "#C0D8D8",
        "main-500": "#0E8080",
      },
      keyframes: {
        "slide-right": {
          "0%": {
            "-webkit-transform": " translateX(-500px);",
            transform: "translateX(-500px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
        "slide-left": {
          "0%": {
            "-webkit-transform": " translateX(500px);",
            transform: "translateX(500px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
        "slide-left2": {
          "0%": {
            "-webkit-transform": " translateX(500px);",
            transform: "translateX(500px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
        "rotate-center": {
          "0%": {
            "-webkit-transform": " rotate(0);",
            transform: "rotate(0);",
          },
          "100%": {
            "-webkit-transform": "rotate(360deg);",
            transform: "rotate(360deg);",
          },
        },
        "rotate-center-pause": {
          "0%": {
            "-webkit-transform": " rotate(0);",
            transform: "rotate(0);",
            "border-radius": "99999px",
          },
          "100%": {
            "-webkit-transform": "rotate(0);",
            transform: "rotate(0);",
          },
        },
        "scale-up-center": {
          "0%": {
            "-webkit-transform": " scale(0);",
            transform: "scale(0);",
          },
          "100%": {
            "-webkit-transform": "scale(1);",
            transform: "scale(1);",
          },
        },
      },
      animation: {
        "slide-right":
          "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-left":
          "slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-left2":
          "slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "rotate-center": "rotate-center 5s linear infinite;",
        "rotate-center-pause": "rotate-center-pause 0.3s linear 2 both;",
        "scale-up-center":
          "scale-up-center 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
      },
      flex: {
        4: "4 4 0%",
      },
    },
    screens: {
      1600: "1600px",
    },
  },
  plugins: [],
};
