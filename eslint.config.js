const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
    {
        files: ["eslint.config.js"],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            ecmaVersion: "latest",
            sourceType: "script",
        },
        rules: {
            "no-var": "error",
            "prefer-const": "error",
            "no-console": "warn",
        },
    },
];
