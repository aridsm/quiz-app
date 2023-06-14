module.exports = {
  content: [
    "./components/**/*.{vue,js}",
    "./utils/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "quiz-blue-100": "#6E64A8",
        "quiz-blue-200": "#3D3375",
        "quiz-blue-300": "#382F6C",
        "quiz-blue-400": "#312963",
        "quiz-white": "#E5E5E5",
        "quiz-pink": "#FF1EAD",
        "quiz-green-light": "#59FF88",
        "quiz-green-dark": "#1A9359",
        "quiz-border": "#4F4588",
      },
    },
  },
};
