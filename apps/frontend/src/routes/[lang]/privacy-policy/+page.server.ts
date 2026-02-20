import type { IStrapi, StrapiResponse } from "$modules/common/types/api";
import type { LayoutServerLoad } from "../$types";
import { api } from "$modules/common";
import type { PrivacyPolicyPageConfig } from "$modules/privacy-policy";

interface PrivacyPolicyPageData extends IStrapi, PrivacyPolicyPageConfig {}

export const load: LayoutServerLoad = async ({ params }) => {
  const locale = params.lang || "de";

  const privacyPolicyPageConfig = await api.get<StrapiResponse<PrivacyPolicyPageData>>(
    `/privacy-policy-page?locale=${locale}`,
  );

  return {
    config: privacyPolicyPageConfig.data,
  };
};
