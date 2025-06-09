/** @type {import('tailwindcss').Config} */
module.exports = {
  // Facultatif en v4 : Tailwind peut détecter le contenu automatiquement.
  // Mais on peut expliciter les chemins pour s'assurer du scan des classes :
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx}', // si vous utilisez encore le dossier pages/
    './components/**/*.{js,ts,jsx,tsx}' // dossiers de composants
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: 'hsl(var(--primary-100))',
          200: 'hsl(var(--primary-200))',
          300: 'hsl(var(--primary-300))'
        },
        accent: {
          100: 'hsl(var(--accent-100))',
          200: 'hsl(var(--accent-200))'
        },
        text: {
          100: 'hsl(var(--text-100))',
          200: 'hsl(var(--text-200))'
        },
        bg: {
          100: 'hsl(var(--bg-100))',
          200: 'hsl(var(--bg-200))',
          300: 'hsl(var(--bg-300))'
        },
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
        danger: {
          DEFAULT: 'hsl(var(--danger))',
          foreground: 'hsl(var(--danger-foreground))'
        }
      }
    }
  }
  // (Pas besoin de plugins additionnels ici pour Tailwind v4)
}
