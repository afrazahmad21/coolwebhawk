import { HawkScope } from './models/hawk-scope.model';

export const emailValidationRegex =
  '/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/';

export const hawkScope: HawkScope[] = [
  {
    type: 'individual',
    name: 'Individual',
    iconName: 'individual',
  },
  {
    type: 'company',
    name: 'Company',
    iconName: 'building',
  },
  {
    type: 'other',
    name: 'Other',
    iconName: 'chart',
  },
];
