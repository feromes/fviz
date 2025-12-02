// @ts-check
const { themes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'FViz',
  tagline: 'Visualização 3D+t do ecossistema FLAZ',
  url: 'https://feromes.github.io',
  baseUrl: '/fviz/',
  favicon: 'img/favicon.ico',

  organizationName: 'feromes', // GitHub user/org
  projectName: 'fviz',         // Repo name

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/', // docs na raiz
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

module.exports = config;
