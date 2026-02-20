import type { IStrapi, StrapiResponse } from "$modules/common/types/api";
import type { LayoutServerLoad } from "../$types";
import { api } from "$modules/common";
import type { AboutPageConfig } from "$modules/about";

interface AboutPageData extends IStrapi, AboutPageConfig {}

export const load: LayoutServerLoad = async ({ params }) => {
  const locale = params.lang || "de";

  const aboutPageConfig = await api.get<StrapiResponse<AboutPageData>>(
    `/about-page?locale=${locale}&populate=*`,
  );

  return {
    config: aboutPageConfig.data,
  };
};
