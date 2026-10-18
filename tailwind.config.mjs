/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        'muted-on-ink': 'var(--muted-on-ink)',
        hair: 'var(--hair)',
        'hair-ink': 'var(--hair-ink)',
        spark: 'var(--spark)',
        'spark-ink': 'var(--spark-ink)',
        'spark-glow': 'var(--spark-glow)',
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
      fontSize: {
        'display-xl': [
          '5.5rem',
          { lineHeight: '1.02', letterSpacing: '-0.03em' },
        ],
        'display-xl-mobile': [
          '3.25rem',
          { lineHeight: '1.08', letterSpacing: '-0.02em' },
        ],
        'display-lg': [
          '4rem',
          { lineHeight: '1.05', letterSpacing: '-0.025em' },
        ],
        'display-lg-mobile': [
          '2.5rem',
          { lineHeight: '1.12', letterSpacing: '-0.015em' },
        ],
        'headline-lg': [
          '2.75rem',
          { lineHeight: '1.15', letterSpacing: '-0.015em' },
        ],
        'headline-md': [
          '2rem',
          { lineHeight: '1.2', letterSpacing: '-0.01em' },
        ],
        'headline-sm': ['1.5rem', { lineHeight: '1.3' }],
        'body-lg': [
          '1.125rem',
          { lineHeight: '1.65', letterSpacing: '-0.01em' },
        ],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.55' }],
        'label-md': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.12em' }],
        'label-sm': ['0.75rem', { lineHeight: '1.3', letterSpacing: '0.14em' }],
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
      spacing: {
        gutter: '1.5rem',
        'gutter-desktop': '2.5rem',
      },
    },
  },
  plugins: [],
};
