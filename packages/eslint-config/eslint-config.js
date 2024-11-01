module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "deprecation"],
  extends: [
    "airbnb-base",
    "airbnb-typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
  ],
  env: {
    browser: true,
  },
  overrides: [
    {
      // By default, ESLint does not scan for .mjs files so we have to overwrite.
      files: ["**/*.{ts,tsx,js,jsx,mjs}"],
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        project: ["tsconfig.json", "packages/*/tsconfig.json"],
      },
      node: {
        project: ["tsconfig.json", "packages/*/tsconfig.json"],
      },
    },
  },
  rules: {
    "no-console": ["error", { allow: ["warn", "error"] }],
    quotes: ["error", "single", { avoidEscape: true }], // https://stackoverflow.com/a/73237056/5522263
    "import/order": ["off"], // conflicted with prettier
    "import/prefer-default-export": ["off"],
    "jsx-a11y/label-has-associated-control": ["off"],
    "react/function-component-definition": [
      1,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "semi", // 'none' or 'semi' or 'comma'
          requireLast: true,
        },
        singleline: {
          delimiter: "semi", // 'semi' or 'comma'
          requireLast: false,
        },
      },
    ],
    "@typescript-eslint/no-import-type-side-effects": "error",
    "import/no-duplicates": ["error", { "prefer-inline": true }],
    "import/no-default-export": ["error"],
    "deprecation/deprecation": ["warn"],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
      },
    ],
    "no-underscore-dangle": ["off"],
    // "import/extensions": [
    //   "error",
    //   "ignorePackages",
    //   {
    //     mjs: "always",
    //     js: "always",
    //     jsx: "always",
    //     ts: "never",
    //     tsx: "never",
    //   },
    // ],
    "import/extensions": ["off"],
    "react/require-default-props": ["off"],
    "react/react-in-jsx-scope": ["off"],
    "react/jsx-props-no-spreading": ["off"],
    "tailwindcss/no-custom-classname": ["off"],
    // Conflicting with prettier-plugin-tailwindcss
    "tailwindcss/classnames-order": ["off"],
    "class-methods-use-this": ["off"],
  },
};
