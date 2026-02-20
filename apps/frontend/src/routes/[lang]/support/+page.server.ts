import type { IStrapi, StrapiResponse } from "$modules/common/types/api";
import type { LayoutServerLoad } from "../$types";
import { api } from "$modules/common";
import type { SupportPageConfig } from "$modules/support";

interface SupportPageData extends IStrapi, SupportPageConfig {}

export const load: LayoutServerLoad = async ({ params }) => {
  return {
    config: {},
  };

  /*
  const locale = params.lang || "de";

  const supportPageConfig = await api.get<StrapiResponse<SupportPageData>>(
    `/support-page?locale=${locale}`,
  );

  return {
    config: supportPageConfig.data,
  };*/
};
