export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'es'],
  sections: {
    home: 'home',
    second_page: 'second-page',
  },
} as const;

export type Locale = (typeof i18n)['locales'][number];
