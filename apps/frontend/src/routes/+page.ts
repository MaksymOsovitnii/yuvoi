import { redirect } from "@sveltejs/kit";
import { browser } from "$app/environment";

export const load = () => {
  if (browser) {
    const cookieMatch = document.cookie.match(/language=(en|de)/);
    throw redirect(302, `/${cookieMatch?.[1] || "de"}`);
  }

  throw redirect(302, "/de");
};
