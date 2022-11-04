module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },

    env: {
        node: true,
        es6: true,
        jest: true
    },
    extends: ['eslint:recommended'],
    rules: {
        'prettier/prettier': [
            'error',
            {},
            {
                usePrettierrc: true
            }
        ]
    }
};
