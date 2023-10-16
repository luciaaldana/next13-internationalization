import { Inter } from 'next/font/google';
import { lngConfig } from '../../lng-config';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return lngConfig.locales.map((locale) => ({ lang: locale }));
}

export default function Root({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  return (
    <html lang={params.lang} className={inter.className}>
      <body>{children}</body>
    </html>
  );
}

export const metadata = {
  title: 'i18n within app directory - Vercel Examples',
  description: 'How to do i18n in Next.js 13 within app directory',
};
