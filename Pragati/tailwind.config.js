
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                upay: {
                    orange: '#F7941D',
                    text: '#333333',
                    bg: '#FEFBF7',
                    gray: '#E5E7EB', // Standard gray for borders
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Assuming Inter or system default
            }
        },
    },
    plugins: [],
}
