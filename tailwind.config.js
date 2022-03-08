const plugin = require("tailwindcss/plugin");
// const defaultTheme = require('tailwindcss/defaultTheme')

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    console.log("opacityValue", opacityValue);
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
  /* const opacities = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  return opacities.map((opacity) => {
    return {
      [opacity]: `rgba(var(${variable}), ${opacity / 100})`,
    };
  }); */
}

module.exports = {
  content: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./index.html", "./src/**/*.{vue,ts}"],
  },
  // theme: {
  //   extend: {
  //     // here's how to extend fonts if needed
  //     fontFamily: {
  //       sans: [...defaultTheme.fontFamily.sans],
  //     },
  //   },
  // },
  theme: {
    extend: {
      colors: {
        primary: "#111d6a",
        /* primary: withOpacityValue("--color-primary"), */
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    plugin(function ({ addVariant, e, postcss }) {
      addVariant("firefox", ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: "-moz-document",
          params: "url-prefix()",
        });
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`
          )}`;
        });
      });
    }),
  ],
};
