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
        },
    },
    plugins: [],
};
