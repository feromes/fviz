import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'ADRs',
      collapsed: false,
      items: [
        'docs/adr/ADR-0001-formato-de-carregamento',
      ],
    },
  ],
};

export default sidebars;
