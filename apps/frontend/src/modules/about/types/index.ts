import type { Button, FormField, StrapiMedia } from "$modules/common";

interface AboutPageConfig {
  badge: string;
  title: string;
  text: string;
  benefitsTitle: string;
  benefitsUnderText: string;
  benefits: {
    id: string;
    title: string | null;
    text: string | null;
    icon: string | null;
    type: "info" | "cta";
    ctaButtonLabel: string | null;
    ctaButtonLink: string | null;
    ctaButtonIcon: string | null;
  }[];
  formTitle: string;
  formFields: FormField[];
  submitButton: Button;
  underForm: string;
  prTitle: string;
  prText: string;
  prItems: StrapiMedia[];
}

export type { AboutPageConfig };
