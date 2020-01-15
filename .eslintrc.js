//const isProduction = process.env.NODE_ENV.replace(/\s/g, "") === 'production';

module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  plugins: [
    "react",
    "@typescript-eslint",
    "react-hooks"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    project: "./tsconfig.json",
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/indent": ["warn", 2],
    "semi": "off",
    "@typescript-eslint/semi": ["warn"],
    "object-curly-spacing": ["warn", "always"],
    "ignoreParameters": true,
    "no-console": process.env.NODE_ENV === 'production' ? 2 : 0,
    "react/prop-types": 0,
    "no-unused-vars": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/interface-name-prefix": 0,
    "prefixWithI": "always",
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/no-explicit-any": 0
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true
  }
};
