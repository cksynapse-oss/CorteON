/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        paper: '#F3EEE4',
        ink: '#15130F',
        muted: '#5C574B',
        'muted-on-ink': '#A29D91',
        hair: '#D8D0BF',
        'hair-ink': '#3A362E',
        spark: '#D9481F',
        'spark-ink': '#B22C01',
        'spark-glow': '#FF6338',
      },
      fontFamily: {
        serif: ['"EB Garamond"', 'Garamond', 'Georgia', 'serif'],
        display: ['"EB Garamond"', 'Garamond', 'Georgia', 'serif'],
        sans: [
          '"Geist Variable"',
          'Geist',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        body: [
          '"Geist Variable"',
          'Geist',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        mono: [
          '"Geist Mono Variable"',
          'Geist Mono',
          'ui-monospace',
          'monospace',
        ],
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '2px',
        md: '4px',
        lg: '4px',
        xl: '4px',
        pill: '9999px',
        full: '9999px',
      },
      maxWidth: {
        content: '1280px',
      },
    },
  },
  plugins: [],
};
