export const lngConfig = {
  defaultLocale: 'en',
  locales: ['en', 'es'],
  sections: {
    home: 'home',
    second_page: 'second-page',
  },
} as const;

export type Locale = (typeof lngConfig)['locales'][number];
