'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n-config';
import styles from './styles.module.css';

const SwitchLng = ({ lng, dictionary }: { lng: string; dictionary: Record<string, string> }) => {
  const pathname = usePathname();
  const languages = i18n.locales;
  const langRegex = languages.join('|');

  return (
    <div className={styles.languageSwitch}>
      {languages.map((lang, index) => (
        <Link
          href={pathname.replace(new RegExp(`^/(${langRegex})\\b`), `/${lang}`)}
          key={lang}
          className={`${styles.link} ${styles[index === 0 ? 'firstLink' : '']} ${
            styles[index === languages.length - 1 ? 'lastLink' : '']
          } ${styles[lang === lng ? 'activeLng' : '']}`}
        >
          <span className={styles.language}>{dictionary[lang]}</span>
        </Link>
      ))}
    </div>
  );
};
export default SwitchLng;
