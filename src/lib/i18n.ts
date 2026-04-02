export const i18n = {
  defaultLocale: "en",
  locales: ["en", "ar"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export const getDictionary = async (locale: string) => {
  const safeLocale = (locale === "ar" ? "ar" : "en") as Locale;
  const dictionaries = {
    en: () => import("@/dictionaries/en.json").then((module) => module.default),
    ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
  };
  return dictionaries[safeLocale]();
};
