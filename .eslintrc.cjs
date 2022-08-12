/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/eslint-config-typescript/recommended"],
    env: {
        node: true,
        browser: true,
        es6: true,
    },
    rules: {
        "max-len": ["error", { code: 200 }],
    },
};
