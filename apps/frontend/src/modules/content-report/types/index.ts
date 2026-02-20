import type { Button, FormField } from "$modules/common";

interface ContentReportPageConfig {
  badge: string;
  title: string;
  text: string;
  formFields: FormField[];
  submitButton: Button;
  underForm: string;
}

export type { ContentReportPageConfig };
