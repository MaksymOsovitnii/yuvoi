import type { Schema, Struct } from "@strapi/strapi";

export interface AboutAboutPageBenefits extends Struct.ComponentSchema {
  collectionName: "components_about_about_page_benefits";
  info: {
    displayName: "About Page Benefits";
  };
  attributes: {
    ctaButtonIcon: Schema.Attribute.String;
    ctaButtonLabel: Schema.Attribute.String;
    ctaButtonLink: Schema.Attribute.String;
    icon: Schema.Attribute.Enumeration<
      [
        "clock",
        "handshake",
        "map-pin",
        "calendar",
        "rocket",
        "zap",
        "shield-check",
        "graduation-cap",
        "paw-print",
        "flame",
        "coffee",
      ]
    >;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<["info", "cta"]> & Schema.Attribute.DefaultTo<"info">;
  };
}

export interface ButtonButton extends Struct.ComponentSchema {
  collectionName: "components_button_buttons";
  info: {
    displayName: "Button";
    icon: "cursor";
  };
  attributes: {
    isInternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface CreatorMotivationCreatorMotivation extends Struct.ComponentSchema {
  collectionName: "components_creator_motivation_creator_motivations";
  info: {
    displayName: "Creator Motivation";
  };
  attributes: {
    creatorMotivationItem: Schema.Attribute.Component<
      "creator-motivation.creator-motivation-item",
      true
    >;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface CreatorMotivationCreatorMotivationItem extends Struct.ComponentSchema {
  collectionName: "components_creator_motivation_creator_motivation_items";
  info: {
    displayName: "Creator Motivation Item";
  };
  attributes: {
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    type: Schema.Attribute.String;
  };
}

export interface CreatorCreatorButton extends Struct.ComponentSchema {
  collectionName: "components_creator_creator_buttons";
  info: {
    displayName: "Creator Button";
  };
  attributes: {
    label: Schema.Attribute.String;
    text: Schema.Attribute.Text;
    url: Schema.Attribute.String;
  };
}

export interface CreatorCreatorInfoBox extends Struct.ComponentSchema {
  collectionName: "components_creator_creator_info_boxes";
  info: {
    displayName: "Creator Info Box";
  };
  attributes: {
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface CreatorCreatorIntegration extends Struct.ComponentSchema {
  collectionName: "components_creator_creator_integrations";
  info: {
    displayName: "Creator Integration";
  };
  attributes: {
    creatorIntegrationItem: Schema.Attribute.Component<"creator.creator-integration-item", true>;
    ctaButton: Schema.Attribute.Component<"button.button", false>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface CreatorCreatorIntegrationItem extends Struct.ComponentSchema {
  collectionName: "components_creator_creator_integration_items";
  info: {
    displayName: "Creator Integration Item";
  };
  attributes: {
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    type: Schema.Attribute.String;
  };
}

export interface CreatorCreatorSubmissionForm extends Struct.ComponentSchema {
  collectionName: "components_creator_creator_submission_forms";
  info: {
    displayName: "Creator Submission Form";
  };
  attributes: {
    fieldId: Schema.Attribute.String & Schema.Attribute.Required & Schema.Attribute.Unique;
    label: Schema.Attribute.String;
    options: Schema.Attribute.Text;
    order: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    placeholder: Schema.Attribute.String;
    required: Schema.Attribute.Boolean;
    type: Schema.Attribute.Enumeration<["input", "select"]>;
  };
}

export interface FooterItemFooterItem extends Struct.ComponentSchema {
  collectionName: "components_footer_item_footer_items";
  info: {
    displayName: "Footer Item";
  };
  attributes: {
    active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isInternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FooterSocialItemFooterSocialItem extends Struct.ComponentSchema {
  collectionName: "components_footer_social_item_footer_social_items";
  info: {
    displayName: "Footer Social Item";
  };
  attributes: {
    order: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    type: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FooterFooterAppButtons extends Struct.ComponentSchema {
  collectionName: "components_footer_footer_app_buttons";
  info: {
    displayName: "Footer App Buttons";
  };
  attributes: {
    label: Schema.Attribute.String;
    type: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface FormFormField extends Struct.ComponentSchema {
  collectionName: "components_form_form_fields";
  info: {
    displayName: "Form Field";
  };
  attributes: {
    fieldId: Schema.Attribute.String & Schema.Attribute.Required & Schema.Attribute.Unique;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    options: Schema.Attribute.Text;
    order: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    placeholder: Schema.Attribute.String;
    required: Schema.Attribute.Boolean;
    type: Schema.Attribute.Enumeration<["input", "textarea", "select"]> & Schema.Attribute.Required;
  };
}

export interface HomeCallToActionHomeCallToAction extends Struct.ComponentSchema {
  collectionName: "components_home_call_to_action_home_call_to_actions";
  info: {
    displayName: "Home: Call to Action";
  };
  attributes: {
    appStoreUrl: Schema.Attribute.String;
    images: Schema.Attribute.Media<"images" | "files", true>;
    playMarketUrl: Schema.Attribute.String;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.DefaultTo<"homeCallToAction">;
  };
}

export interface HomeIntroHomeIntro extends Struct.ComponentSchema {
  collectionName: "components_home_intro_home_intros";
  info: {
    displayName: "Home: Intro";
  };
  attributes: {
    image: Schema.Attribute.Media<"images">;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"homeIntro">;
  };
}

export interface HomeStatementsHomeStatements extends Struct.ComponentSchema {
  collectionName: "components_home_statements_home_statements";
  info: {
    displayName: "Home: Statements";
  };
  attributes: {
    homeInvestorStatement: Schema.Attribute.Component<
      "investor-statement.investor-statement",
      true
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String;
    type: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"homeStatements">;
  };
}

export interface InvestorStatementInvestorStatement extends Struct.ComponentSchema {
  collectionName: "components_investor_statement_investor_statements";
  info: {
    displayName: "Home: Investor Statement";
  };
  attributes: {
    active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    avatar: Schema.Attribute.Media<"images">;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    role: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    type: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"homeInvestorStatement">;
  };
}

export interface PartnerCardPartnerCard extends Struct.ComponentSchema {
  collectionName: "components_partner_card_partner_cards";
  info: {
    displayName: "Partner Card";
  };
  attributes: {
    description: Schema.Attribute.Text;
    logo: Schema.Attribute.Media<"images"> & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module "@strapi/strapi" {
  export module Public {
    export interface ComponentSchemas {
      "about.about-page-benefits": AboutAboutPageBenefits;
      "button.button": ButtonButton;
      "creator-motivation.creator-motivation": CreatorMotivationCreatorMotivation;
      "creator-motivation.creator-motivation-item": CreatorMotivationCreatorMotivationItem;
      "creator.creator-button": CreatorCreatorButton;
      "creator.creator-info-box": CreatorCreatorInfoBox;
      "creator.creator-integration": CreatorCreatorIntegration;
      "creator.creator-integration-item": CreatorCreatorIntegrationItem;
      "creator.creator-submission-form": CreatorCreatorSubmissionForm;
      "footer-item.footer-item": FooterItemFooterItem;
      "footer-social-item.footer-social-item": FooterSocialItemFooterSocialItem;
      "footer.footer-app-buttons": FooterFooterAppButtons;
      "form.form-field": FormFormField;
      "home-call-to-action.home-call-to-action": HomeCallToActionHomeCallToAction;
      "home-intro.home-intro": HomeIntroHomeIntro;
      "home-statements.home-statements": HomeStatementsHomeStatements;
      "investor-statement.investor-statement": InvestorStatementInvestorStatement;
      "partner-card.partner-card": PartnerCardPartnerCard;
    }
  }
}
