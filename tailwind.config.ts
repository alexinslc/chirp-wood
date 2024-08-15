import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'shire-forest': '#3B5323',
        'shire-bark': '#4E3B31',
        'shire-sky': '#A3C1AD',
        'shire-cream': '#F5F5DC',
        'shire-gold': '#D2B48C',
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
          backgroundColor: '#D2B48C',
          color: '#3B5323',
          fontWeight: 'bold',
          borderRadius: '9999px',
          transition: 'background-color 0.3s',
          '&:hover': {
            backgroundColor: '#4E3B31',
          },
        },
      });
    },
  ],
};

export default config;
