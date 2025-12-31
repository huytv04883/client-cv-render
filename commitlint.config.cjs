module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'style', 'docs', 'test', 'update'],
    ],
    'subject-case': [2, 'never', ['sentence-case', 'start-case']],
    'subject-max-length': [2, 'always', 72],
    'scope-empty': [1, 'never'],
  },
};
