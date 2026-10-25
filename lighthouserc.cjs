module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      numberOfRuns: 3,
      url: [
        'http://localhost/',
        'http://localhost/programmes/',
        'http://localhost/enquire/',
        'http://localhost/fellowship/',
      ],
      settings: {
        chromeFlags: '--no-sandbox --headless',
      },
    },
    assert: {
      assertions: {
        'categories:performance': [
          'error',
          { minScore: 0.9, aggregationMethod: 'median-run' },
        ],
        'categories:accessibility': [
          'error',
          { minScore: 0.95, aggregationMethod: 'median-run' },
        ],
        'categories:best-practices': [
          'error',
          { minScore: 0.95, aggregationMethod: 'median-run' },
        ],
        'categories:seo': [
          'error',
          { minScore: 0.95, aggregationMethod: 'median-run' },
        ],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
    },
  },
};
