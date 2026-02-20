import type { IStrapi, StrapiResponse } from "$modules/common/types/api";
import type { LayoutServerLoad } from "../$types";
import { api } from "$modules/common";
import type { LegalNoticePageConfig } from "$modules/legal-notice";

interface LegalNoticePageData extends IStrapi, LegalNoticePageConfig {}

export const load: LayoutServerLoad = async ({ params }) => {
  const locale = params.lang || "de";

  const legalNoticePageConfig = await api.get<StrapiResponse<LegalNoticePageData>>(
    `/legal-notice-page?locale=${locale}`,
  );

  return {
    config: legalNoticePageConfig.data,
  };
};
