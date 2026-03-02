export interface ColumnConfig<T> {
  field: keyof T;
  label: string;
  sortable?: boolean;
  sortBy?: string;
  cellClass?: string;
  width?: string;
  isFullTextNeeded?: boolean;
}

export interface NavItem {
  title: string;
  url: string;
  child: NavItem[];
}

export interface FooterItems {
  footerItems: {
    order: number;
    label: string;
    url: string;
    isInternal: boolean;
    active: boolean;
  }[];
  footerSocialItems: {
    order: number;
    type: string;
    url: string;
  }[];
  footerAppButtons: {
    type: string;
    label: string;
    url: string;
    disabled: boolean;
  }[];
}

export interface FormField {
  id: number;
  fieldId: string;
  order: number;
  label: string;
  placeholder: string;
  type: "input" | "select" | "textarea";
  required: boolean;
  options: string | null;
}

export interface Button {
  label: string;
  url: string | null;
  isInternal: boolean;
  disabled: boolean;
}
