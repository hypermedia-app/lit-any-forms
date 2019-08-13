module.exports = {
  hooks: {
    'pre-commit': 'lint-staged && tsc --noEmit',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
}
