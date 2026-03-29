/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                syne: ["'Syne'", "sans-serif"],
                mono: ["'IBM Plex Mono'", "monospace"],
                sans: ["'Inter'", "sans-serif"],
            },
        },
    },
    plugins: [],
}