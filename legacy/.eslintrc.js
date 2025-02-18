// @flow

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:flowtype/recommended',
    'plugin:react-prefer-function-component/recommended',
    'prettier', // keep this last
  ],
  plugins: ['react', 'react-native', 'flowtype', 'react-prefer-function-component', 'eslint-plugin-simple-import-sort'],
  env: {'react-native/react-native': true},
  settings: {
    'import/resolver': {node: {extensions: ['.js', '.android.js', '.ios.js', '.json']}},
    react: {version: 'detect'},
  },
  rules: {
    'array-callback-return': 2,
    'flowtype/newline-after-flow-annotation': [2, 'always'],
    'flowtype/require-valid-file-annotation': [2, 'always'],
    'lines-between-class-members': [1, 'always', {exceptAfterSingleLine: true}],
    'no-multiple-empty-lines': ['warn', {max: 2, maxEOF: 0}],
    'no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
    'react-native/no-raw-text': ['error', {skip: ['Markdown']}],
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 0,
    'react/display-name': 0,
    'react/no-access-state-in-setstate': 2,
    'react/no-typos': 2,
    'react/sort-comp': [2, {order: ['instance-variables', 'lifecycle', 'everything-else', 'render']}],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'spaced-comment': 1,
  },
  globals: {
    Buffer: false,
    Symbol: false,
    Uint8Array: false,
    TextEncoder: false,
    $Call: false,
    $Values: false,
    test: false,
    expect: false,
    describe: false,
    it: false,
    beforeEach: false,
    React$Node: false,
  },
}
