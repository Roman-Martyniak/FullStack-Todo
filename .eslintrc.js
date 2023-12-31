module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: ["standard", "prettier", "plugin:prettier/recommended"],
    plugins: ["prettier"],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {},
};
