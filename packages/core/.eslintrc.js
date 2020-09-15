module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [ 'plugin:vue/essential', '@vue/typescript' ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'space-before-function-paren': [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    semi: [ 'error', 'never' ],
    'no-console': 'off',
    'no-debugger': 'off',
  },
  overrides: [
    {
      files: [ '**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)' ],
      env: {
        mocha: true,
      },
    },
  ],
}
