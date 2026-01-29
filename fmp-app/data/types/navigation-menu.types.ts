export interface SubMenuItem {
  id: number;
  label: string;
  href: string;
  description?: string;
  order?: number;
}

export interface MenuItem {
  id: number;
  label: string;
  href?: string;
  hasDropdown: boolean;
  subItems?: SubMenuItem[];
  order?: number;
}

export interface NavigationMenuData {
  data: {
    id: number;
    documentId: string;
    mainMenuItems?: MenuItem[];
  };
}
