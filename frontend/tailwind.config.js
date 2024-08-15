/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                plusjakarta: ["Plus Jakarta Sans", "sans-serif"],
            },
            screens: {
                1440: "1440px",
            },
            borderWidth: {
                14: "14px",
            },
            boxShadow: {
                myBox: "4px 4px 0px 0px rgb(0,0,0,1)",
            },
            transitionDuration: {
                500: "500ms",
            },
        },
    },
    plugins: [],
};
