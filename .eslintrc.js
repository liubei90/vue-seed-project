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
};