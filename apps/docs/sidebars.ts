import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introdução',
    },

    {
      type: 'category',
      label: 'Architecture Decision Records',
      collapsed: false,
      items: [
        'adrs/ADR-0001-formato-de-carregamento',
      ],
    },
  ],
};


export default sidebars;
