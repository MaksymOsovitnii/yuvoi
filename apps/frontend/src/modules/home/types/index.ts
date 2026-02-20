import type { StrapiMedia } from "$modules/common/types/api";

interface HomePageIntroConfig {
  title: string;
  text: string;
  image: StrapiMedia;
}

interface HomePageConfig {
  becomeCreatorButton: {
    label: string;
    url: string;
  };
  intro: HomePageIntroConfig;
  callToAction: {
    title: string;
    text: string;
    appStoreUrl: string;
    playMarketUrl: string;
    images: StrapiMedia[];
  };
  statements: {
    title: string;
    items: {
      order: number;
      name: string;
      role: string;
      text: string;
      avatar: StrapiMedia | null;
      active: boolean;
    }[];
  };
}

export type { HomePageConfig, HomePageIntroConfig };
