
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive','f4c'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page','be1'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/','5a3'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/','a24'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/components/buttons',
        component: ComponentCreator('/components/buttons','d7f'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/components/links',
        component: ComponentCreator('/components/links','d77'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/design-tokens/colors',
        component: ComponentCreator('/design-tokens/colors','535'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/design-tokens/test2',
        component: ComponentCreator('/design-tokens/test2','004'),
        exact: true,
        'sidebar': "tutorialSidebar"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
