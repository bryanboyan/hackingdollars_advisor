// @ts-check

/** @type {import("@trivago/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  importOrder: [
    '^(.*)/register$',
    '<THIRD_PARTY_MODULES>',
    '^@purplefish/(.*)$',
    // Initializing files should be run before everything else.
    '^@/(.*)/init$',
    '^@/common/(.*)$',
    '^@/electron-main/services/(.*)/ipc-descriptor',
    '^@/electron-main/services/(.*)/interfaces',
    '^@/electron-main/(.*)$',
    '^@/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: false,
  importOrderGroupNamespaceSpecifiers: false,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};

export default config;
