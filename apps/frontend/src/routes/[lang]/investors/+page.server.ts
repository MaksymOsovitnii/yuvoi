import type { IStrapi, StrapiResponse } from "$modules/common/types/api";
import type { LayoutServerLoad } from "../$types";
import { api } from "$modules/common";
import type { InvestorsPageConfig } from "$modules/investors";

interface InvestorsPageData extends IStrapi, InvestorsPageConfig {}

export const load: LayoutServerLoad = async ({ params }) => {
  const locale = params.lang || "de";

  const query = [
    "populate[formFields]=*",
    "populate[submitButton]=*",
    "populate[partnerCards][populate]=*",
  ].join("&");

  const investorsPageConfig = await api.get<StrapiResponse<InvestorsPageData>>(
    `/investors-page?locale=${locale}&${query}`,
  );

  return {
    config: investorsPageConfig.data,
  };
};
