import type { IStrapi, StrapiResponse } from "$modules/common/types/api";
import type { LayoutServerLoad } from "../$types";

import type { CreatorPageConfig } from "$modules/creator";
import { api } from "$modules/common";

interface CreatorPageData extends IStrapi, CreatorPageConfig {}

export const load: LayoutServerLoad = async ({ params }) => {
  const locale = params.lang || "de";

  const query = [
    "populate[creatorMotivation][populate]=*",
    "populate[creatorIntegration][populate]=*",
    "populate[creatorInfoBox][populate]=*",
    "populate[creatorButton][populate]=*",
    "populate[creatorSubmissionFormItem][populate]=*",
  ].join("&");

  const creatorPageConfig = await api.get<StrapiResponse<CreatorPageData>>(
    `/creator-page?locale=${locale}&${query}`,
  );

  return {
    config: creatorPageConfig.data,
  };
};
