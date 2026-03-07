import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#66F1C2',
        teal: '#00CEC9',
        coral: '#FF7675',
        amber: '#FDCB6E',
        dark: '#2D3436',
        light: '#F8F9FA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 4px 20px rgba(102, 241, 194, 0.08)',
      },
    },
  },
  plugins: [],
}

export default config
