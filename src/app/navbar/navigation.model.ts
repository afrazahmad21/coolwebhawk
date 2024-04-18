export interface NavItem {
  children?: NavItem[];
  disabled?: boolean;
  displayName?: string;
  featureId?: number;
  iconName: string;
  isAuthorized?: boolean;
  isExact?: boolean;
  isExpanded?: boolean;
  isVisible?: boolean;
  permission?: string;
  route?: string;
  serviceName?: string;
  type?: string;
  url?: string;
  urlWithoutAccountId?: boolean;
}
