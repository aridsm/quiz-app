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
        "quiz-grey-100": "#706D84",
        "quiz-grey-200": "#333646",
        "quiz-grey-300": "#222431",
        "quiz-grey-400": "#181922",
        "quiz-white": "#DEDAFF",
        "quiz-pink": "#FF629A",
        "quiz-blue": "#4ED7F5",
        "quiz-blue-dark": "#295862",
        "quiz-blue-hover": "#90EBFF",
        "quiz-blue-active": "#43B5B5",
        "quiz-border": "#100F18",
      },
    },
  },
};
