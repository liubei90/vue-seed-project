module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: "standard",
  env: {
    browser: true,
  },
  plugins: [
    'html'
  ],
  rules: {
    semi: [2, 'always'],
  }
};