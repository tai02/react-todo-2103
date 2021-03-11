module.exports = {
  plugins: ['stylelint-scss'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  extends: [
    'stylelint-config-prettier',
    'stylelint-config-recess-order',
    'stylelint-config-standard',
  ],
  rules: {
    'scss/dollar-variable-colon-space-after': 'always',
    'declaration-block-no-duplicate-properties': true,
    'at-rule-no-unknown': null,
    'value-list-comma-newline-after': null,
    'declaration-colon-newline-after': null,
  },
}
