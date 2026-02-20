import type { IStrapi, StrapiResponse } from "$modules/common/types/api";
import type { LayoutServerLoad } from "../$types";
import { api } from "$modules/common";
import type { ContentReportPageConfig } from "$modules/content-report";

interface ContentReportPageData extends IStrapi, ContentReportPageConfig {}

export const load: LayoutServerLoad = async ({ params }) => {
  const locale = params.lang || "de";

  const contentReportPageConfig = await api.get<StrapiResponse<ContentReportPageData>>(
    `/content-report-page?locale=${locale}&populate=*`,
  );

  return {
    config: contentReportPageConfig.data,
  };
};
