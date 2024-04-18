import { NavItem } from '../navbar/navigation.model';

export let menuConfiguration: NavItem[] = [
  {
    displayName: 'My Dashboard',
    iconName: 'dashboard',
    route: 'dashboard',
  },
  {
    displayName: 'Search',
    iconName: 'search',
    route: 'search',
    children: [
      {
        displayName: 'Individual',
        iconName: 'individual',
        route: 'search/individual',
      },
      {
        displayName: 'Company',
        iconName: 'company',
        route: 'search/company',
      },
    ],
  },
  {
    displayName: 'Reports',
    iconName: 'reports',
    route: 'reports',
  },
  {
    displayName: 'Index',
    iconName: 'index',
    route: 'index',
  },
  {
    displayName: 'Others',
    iconName: 'others',
    route: 'others',
  },
  // {
  //   displayName: 'FAQ',
  //   iconName: 'faq',
  //   route: 'faq'
  // },
  // {
  //   displayName: 'Support',
  //   iconName: 'support',
  //   route: 'support'
  // },
  // {
  //   displayName: 'Settings',
  //   iconName: 'settings',
  //   route: 'settings'
  // },
  // {
  //   displayName: 'Quit',
  //   iconName: 'quit',
  // }
];
