export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'float-slow': 'float 30s ease-in-out infinite',
        'blob': 'blob 7s infinite',
        'gradient': 'gradient 3s ease infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slower': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'card-pop': 'card-pop 0.4s ease-out',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },

  },
  plugins: [],
};

// tailwind.config.js
// export default00 = {
//   theme: {
//     extend: {
//       animation: {
//         'float': 'float 20s ease-in-out infinite',
//         'float-slow': 'float 30s ease-in-out infinite',
//         'blob': 'blob 7s infinite',
//         'gradient': 'gradient 3s ease infinite',
//         'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
//         'pulse-slower': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
//         'fade-in-up': 'fadeInUp 0.6s ease-out',
//         'fade-in': 'fadeIn 0.5s ease-out',
//         'card-pop': 'card-pop 0.4s ease-out',
//         'slide-in-left': 'slide-in-left 0.5s ease-out',
//         'shake': 'shake 0.5s ease-in-out',
//       },
//       keyframes: {
//         fadeInUp: {
//           '0%': { opacity: '0', transform: 'translateY(20px)' },
//           '100%': { opacity: '1', transform: 'translateY(0)' },
//         },
//         fadeIn: {
//           '0%': { opacity: '0' },
//           '100%': { opacity: '1' },
//         },
//       },
//     },
//   },
// };