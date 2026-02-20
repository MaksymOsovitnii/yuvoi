interface CreatorSubmissionFormItem {
  id: number;
  fieldId: string;
  order: number;
  label: string;
  placeholder: string;
  type: "input" | "select";
  required: boolean;
  options: string | null;
}

interface CreatorPageConfig {
  creatorMotivation: {
    id: number;
    title: string;
    text: string;
    creatorMotivationItem: {
      id: number;
      title: string[];
      text: string[];
      type: string;
    }[];
  };
  creatorIntegration: {
    id: number;
    title: string;
    text: string;
    creatorIntegrationItem: {
      id: number;
      title: string[];
      text: string[];
      type: string;
    }[];
    ctaButton: {
      id: number;
      label: string;
      url: string;
    };
  };
  creatorInfoBox: {
    id: number;
    title: string;
    text: string;
  };
  creatorButton: {
    id: number;
    label: string;
    text: string;
    url: string;
  };
  underForm: string;
  creatorSubmissionFormItem: CreatorSubmissionFormItem[];
}

export type { CreatorPageConfig, CreatorSubmissionFormItem };
