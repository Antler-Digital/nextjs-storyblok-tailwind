module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.js',
    './components/**/*.jsx',
    './components/**/*.tsx',
    './components/**/*.ts',
    './pages/**/*.js',
    './pages/**/*.ts',
    './pages/**/*.tsx'
  ],
  theme: {
    extend: {
      opacity: {
        10: '0.1',
        20: '0.2',
        30: '0.3',
        40: '0.4',
        50: '0.5',
        60: '0.6',
        70: '0.7',
        80: '0.8',
        90: '0.9',
        95: '0.95'
      },
      minHeight: {
        800: '800px'
      },
      spacing: {
        9: '2.25rem',
        35: '8.75rem',
        47: '11.875rem',
        72: '18rem',
        80: '20rem',
        88: '22rem',
        96: '24rem',
        104: '26rem',
        112: '28rem',
        120: '30rem',
        136: '34rem',
        152: '38rem',
        168: '42rem',
        184: '46rem',
        200: '50rem',
        224: '56rem',
        248: '62rem',
        '150vh': '150vh',
        '125vh': '125vh'
      },
      inset: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        40: '10rem',
        48: '12rem',
        56: '14rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
        88: '22rem',
        96: '24rem',
        104: '26rem',
        112: '28rem',
        '1/2': '50%',
        '1/4': '25%',
        '3/4': '75%',
        full: '100%',
        '-1/2': '-50%',
        '-1/4': '-25%',
        '-3/4': '-75%',
        '-full': '-100%'
      },
      fontSize: {
        '7xl': '4.5rem',
        '8xl': '5rem',
        '9xl': '5.5rem',
        '10xl': '6rem',
        '11xl': '6.5rem'
      },
      maxHeight: {
        '1/2': '50vh',
        '1/3': '33.33vh',
        '2/3': '66.66vh',
        '1/4': '25vh',
        '3/4': '75vh',
        none: 'none'
      },
      maxWidth: {
        xxs: '14rem',
        'screen-2xl': '1350px',
        content: 'max-content'
      },
      minWidth: {
        xxxs: '12rem',
        xxs: '16rem',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%'
      },
      zIndex: {
        front: 99999,
        back: -99999
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
};
