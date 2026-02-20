import { UiLanguage } from "$modules/common";
import { page } from "$app/stores";
import { derived } from "svelte/store";

export const languageStore = derived<typeof page, UiLanguage>(page, ($page) => {
  const match = $page?.url?.pathname?.match(/^\/(en|de)/);
  return (match?.[1] as UiLanguage) || UiLanguage.DE;
});
