const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["i18n.config.ts"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Vazirmatn", ...defaultTheme.fontFamily.sans],
    },
  },
};
