/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ['lato', 'sans-serif'],
        arimo: ['arimo', 'sans-serif'],
        plusJakartaSans: ['Plus Jakarta Sans', 'sans-serif']
      },
      boxShadow: {
        'edge': ' 0 0 0 0.25px #999999',
        'gray': '0 0 0 0.5px rgba(202, 202, 202, 1)',
        'companyInputBorder':'0 0 0 0.25px #999999',
        'dropdownBorder':'0 0 0 0.25px #B9B9B9',
        'sand':'0 0 0 0.5px #E4E4E4'
      }
    },
    // colors: {
    //   lightgray: '#F5F5F5',
    //   darkgreen: '#335908',
    //   darkgray: '#413F3D',
    //   xlightgray: '#8A9194',
    //   primaryGray: '#333333',
    //   fadegray: '#7E7E7E',
    //   black: '#000000',
    //   borderGray: '#CACACA',
    //   inputBorder: '#999999',
    //   registerBg: 'rgba(153, 153, 153, 0.1)',
    //   opaqueInputBorder: 'rgba(153, 153, 153, 0.2)',
    //   opaqueGray: 'rgba(229, 229, 229, 0.2)',
    //   lightBtn: '#F1F1F1',
    //   skyBlue: '#D4EBFF',
    //   white:'#FFFFFF',
    //   lightGreen:'#E0F5B1',
    //   dullGreen: '#EFF7E1',
    //   tableBorder:'#E4E4E4',
    //   skyGray:'#F6F6F9',
    //   pencilGray: '#949494',
    //   fadeTableGray:"rgba(246, 246, 249, 0.40)",
    //   primaryBlue:'#0066FF',
    //   chartBorder:'rgba(0, 0, 0, 0.25)',
    //   brightGreen:"#69AC1D",
    //   searchBorder:'#BDBDBD',
    //   threadGray: '#B9B9B9',
    //   sandGray:"#F6F6F6",
    //   red: "#FF0000"
    // }
  },
  plugins: [],
}

