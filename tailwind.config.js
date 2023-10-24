/* eslint-env node */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          150:"#327dee",
          100: "#68A4FF",
          50: "rgba(104, 164, 255, 0.5)",
          25: "rgba(104, 164, 255, 0.22)",
          10:'#F6F6F6'
        },
        second: {
          100: "#455061",
          75: "#888888",
          70: "#969696",
          50: "#B6B6B6",
          25: "#EBEBEB",
          20: "#E2E0E0",
        },
        blue:{
          25: "#EBF3FF",
          35: "rgba(81, 136, 219, 0.33)"
        },
        gray:{
          80:'#F0F0F0',
          40:'#707070',
          50:'rgba(176, 176, 176, 0.87);'
        },
        purple:{
          50:'#655B96'
        }
      },
      boxShadow: {
        'gray-1': '1px 1px 1px #dbdbdb',
        'gray-2':'0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
        'gray-3':'0px 3px 6px rgba(0, 0, 0, 0.16)',
        'gray-4':'0px 0px 6px rgba(41, 37, 37, 0.60)',
      },
      fontFamily: {
        'roboto': ['Roboto'],
        'jakarta': ['Plus Jakarta Sans'],
      },
      screens: {
        'print': {'raw': 'print'}, 
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
