// @ts-check
const { themes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'FViz',
  tagline: 'Visualização 3D+t do ecossistema FLAZ',
  url: 'https://feromes.github.io',
  baseUrl: '/fviz/',
  favicon: 'img/favicon.ico',

  themeConfig: {
    navbar: {
      title: 'FViz',
      logo: {
        alt: 'FViz Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/',
          label: '@fviz',
          position: 'left',
        },
        {
          to: '/intro',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/feromes/fviz',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
  },

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

