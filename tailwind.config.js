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
        "quiz-grey-100": "#66637B",
        "quiz-grey-200": "#313242",
        "quiz-grey-300": "#1F202C",
        "quiz-grey-400": "#181922",
        "quiz-white": "#DDDAF7",
        "quiz-pink": "#FF629A",
        "quiz-blue": "#4ED7F5",
        "quiz-blue-dark": "#295862",
        "quiz-blue-hover": "#4BC8E4",
        "quiz-border": "#100F18",
      },
    },
  },
};
