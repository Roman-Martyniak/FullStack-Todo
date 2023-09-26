module.exports = {
    extends: "standard",
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh", "prettier"],
    rules: {
        "@typescript-eslint/no-unused-vars": 0,
        "@typescript-eslint/no-exlicit-any": "off",
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
};
