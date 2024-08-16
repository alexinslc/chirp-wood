import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'shire-forest': '#556B2F', // Softer forest green
        'shire-bark': '#8B4513',   // Warm brown, closer to natural wood
        'shire-sky': '#7F9B7C',    // Muted sage green, like a cloudy sky
        'shire-cream': '#F5F5DC',  // Cream for text and backgrounds
        'shire-gold': '#C5A880',   // Muted gold for accents
      },
      borderRadius: {
        'pill': '9999px', // Pill shape
      },
    },
  },
  plugins: [
    function({ addComponents }: { addComponents: any }) {
      addComponents({
        '.btn-pill': {
          padding: '0.5rem 1.5rem',
          backgroundColor: '#C5A880',
          color: '#556B2F',
          fontWeight: 'bold',
          borderRadius: '9999px',
          transition: 'background-color 0.3s',
          '&:hover': {
            backgroundColor: '#8B4513',
          },
        },
      });
    },
  ],
};

export default config;
