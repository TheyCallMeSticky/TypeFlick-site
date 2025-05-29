// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: 'hsl(300, 100%, 50%)',
          200: 'hsl(300, 100%, 69%)',
          300: 'hsl(300, 100%, 92%)'
        },
        accent: {
          100: 'hsl(180, 100%, 50%)',
          200: 'hsl(181, 100%, 30%)'
        },
        text: {
          100: 'hsl(0, 0%, 100%)',
          200: 'hsl(0, 0%, 88%)'
        },
        bg: {
          100: 'hsl(0, 0%, 10%)',
          200: 'hsl(0, 0%, 16%)',
          300: 'hsl(0, 0%, 25%)'
        }
      }
    }
  },
  plugins: []
}
export default config