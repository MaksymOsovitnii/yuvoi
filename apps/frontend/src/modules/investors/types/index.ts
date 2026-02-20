import type { Button, FormField } from "$modules/common";
import type { StrapiMedia } from "$modules/common/types/api";

interface PartnerCard {
  logo: StrapiMedia;
  name: string;
  description: string;
}

interface InvestorsPageConfig {
  badge: string;
  title: string;
  text: string;
  formFields: FormField[];
  submitButton: Button;
  underForm: string;
  partnerTitle: string;
  partnerCards: PartnerCard[];
}

export type { InvestorsPageConfig };
