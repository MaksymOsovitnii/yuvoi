import { UiLanguage } from "$modules/common";

export async function handle({ event, resolve }) {
  const { pathname } = event.url;

  const isStatic = pathname.includes("sitemap.xml") || pathname.includes("robots.txt");
  if (isStatic) {
    return resolve(event);
  }

  const langMatch = pathname.match(/^\/(en|de)(\/|$)/);

  if (!langMatch) {
    const savedLang = event.cookies.get("language") as UiLanguage;
    const language = savedLang || UiLanguage.DE;
    return Response.redirect(new URL(`/${language}${pathname}`, event.url), 307);
  }

  const currentLang = langMatch[1];

  // Set cookie BEFORE resolve — some adapters produce immutable responses
  event.cookies.set("language", currentLang, {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  return resolve(event);
}
