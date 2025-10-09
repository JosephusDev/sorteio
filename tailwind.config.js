/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Cores principais
        primary: '#4D5DFA',
        secondary: '#FFD300',
        
        // Cores de alerta e status
        success: '#4ADE80',
        info: '#246BFD',
        warning: '#FACC15',
        error: '#F75555',
        disabled: '#D8D8D8',
        'button-disabled': '#6D79EA',
        
        // Escala de cinza
        greyscale: {
          900: '#212121',
          800: '#424242',
          700: '#616161',
          600: '#757575',
          500: '#9E9E9E',
          400: '#BDBDBD',
          300: '#E0E0E0',
          200: '#EEEEEE',
          100: '#F5F5F5',
          50: '#FAFAFA',
        },
      },
      fontFamily: {
        'urbanist-regular': 'Urbanist_400Regular',
        'urbanist-medium': 'Urbanist_500Medium',
        'urbanist-semiBold': 'Urbanist_600SemiBold',
        'urbanist-bold': 'Urbanist_700Bold',
      },
      boxShadow: {
        'button': '0px 10px 15px -3px rgba(77, 93, 250, 0.15)',
      },
    },
  },
  plugins: [],
}