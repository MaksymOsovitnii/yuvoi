import type { LayoutServerLoad } from "./$types";
import type { NavItem } from "$modules/common/types/ui";
import type { IStrapi, StrapiResponse } from "$modules/common/types/api";
import type { HomePageConfig } from "$modules/home";
import { api } from "$modules/common";

interface NavItemData extends IStrapi {
  title: string;
  slug?: string;
  url: string;
  order: number;
  child: NavItemData[];
  parent?: NavItemData;
}

interface FooterData extends IStrapi {
  footerItem: {
    id: number;
    order: number;
    label: string;
    url: string;
    isInternal: boolean;
  }[];
  footerSocialItem: {
    id: number;
    order: number;
    type: string;
    url: string;
  }[];
  footerAppButton: {
    id: number;
    type: string;
    label: string;
    url: string;
  }[];
}

interface HomePageData extends IStrapi {
  becomeCreatorButton: {
    id: number;
    label: string;
    url: string;
  };
  blocks: any[];
}

const getNavItemData = (navItem: NavItemData): NavItem => {
  return {
    title: navItem.title,
    url: navItem.url,
    child: navItem.child?.length
      ? navItem.child?.sort((a, b) => a.order - b.order).map((ch) => getNavItemData(ch))
      : [],
  };
};

export const load: LayoutServerLoad = async ({ params }) => {
  const locale = params.lang || "de";

  // Query to populate all home page internal blocks
  const query = [
    "populate[becomeCreatorButton]=*",
    "populate[blocks][on][home-intro.home-intro][populate]=image",
    "populate[blocks][on][home-call-to-action.home-call-to-action][populate]=*",
    "populate[blocks][on][home-statements.home-statements][populate][homeInvestorStatement][populate]=avatar",
  ].join("&");

  // Make all API requests in parallel to avoid timeout
  const [navItemsData, footerData, homepageData] = await Promise.all([
    api.get<StrapiResponse<NavItemData[]>>(
      `/nav-items?locale=${locale}&populate=child&populate=parent&order=order`,
    ),
    api.get<StrapiResponse<FooterData>>(`/footer?locale=${locale}&populate=*`),
    api.get<StrapiResponse<HomePageData>>(`/home-page?locale=${locale}&${query}`),
  ]);

  // Process nav items
  const sortedNavItems = navItemsData.data.sort((a, b) => a.order - b.order);

  const navItems: NavItem[] = [];
  for (const item of sortedNavItems) {
    if (!item.parent) {
      navItems.push(getNavItemData(item));
    }
  }

  const statementsBlock = homepageData.data.blocks.find((i) => i.type === "homeStatements");

  const config: HomePageConfig = {
    becomeCreatorButton: homepageData.data.becomeCreatorButton,
    intro: homepageData.data.blocks.find((i) => i.type === "homeIntro"),
    callToAction: homepageData.data.blocks.find((i) => i.type === "homeCallToAction"),
    statements: {
      title: statementsBlock.title,
      items: statementsBlock?.homeInvestorStatement?.sort(
        (a: { order: number }, b: { order: number }) => a.order - b.order,
      ),
    },
  };

  return {
    navItems,
    footer: {
      footerItems: footerData.data.footerItem,
      footerSocialItems: footerData.data.footerSocialItem,
      footerAppButtons: footerData.data.footerAppButton,
    },
    config,
  };
};
