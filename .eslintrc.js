const path = require('path');

module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              '@': path.resolve('./src'),
            },
            extensions: ['.js', '.json', '.jsx'],
          },
        },
      },
    },
  },
  rules: {
    'global-require': 'off',
    'react/prop-types': 'off',
    'react/prefer-stateless-function': 'off',
    'react/no-array-index-key': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': ['error', 'always', {
      js: 'never',
      jsx: 'never',
    }],
    'no-unused-expressions': ['error', { allowTaggedTemplates: true }],
    'no-unused-vars': ['error', { args: 'none' }],
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
  },
};
