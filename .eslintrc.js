module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  globals: {
    JSX: true,
    React: true
  },
  plugins: ['simple-import-sort', 'prettier'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:sonarjs/recommended',
    // 'plugin:unicorn/recommended',
    'plugin:security/recommended',
    // 'plugin:react-hooks/recommended',
    'next',
    'next/core-web-vitals',
    'prettier'
  ],
  rules: {
    'no-console': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: 'useRecoilCallback|useRecoilTransaction_UNSTABLE'
      }
    ],
    // 'simple-import-sort/imports': 'warn',
    'unicorn/filename-case': 'off',
    'next/no-img-element': 'off',
    // 'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // lint breaks in BondRating.tsx when using this rule
    'no-unused-vars': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton']
      }
    ]
  }
};
