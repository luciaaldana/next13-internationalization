import Link from 'next/link';
import { getDictionary } from '@/get-dictionary';
import { i18n, Locale } from '@/i18n-config';
import SwitchLng from '@/components/SwitchLng';
import styles from '../page.module.css';

const SecondPage = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang, i18n.sections.second_page);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>{dictionary.note}</p>
      </div>
      <SwitchLng lng={lang} dictionary={dictionary.languages} />
      <div className={styles.center}>
        <h1>{dictionary.title}</h1>
        <p>{dictionary.description}</p>
      </div>

      <div className={styles.cardsContainer}>
        <Link href={`/${lang}`} className={styles.card}>
          <h2>
            {dictionary.link.title} <span>-&gt;</span>
          </h2>
          <p> {dictionary.link.description}</p>
        </Link>
      </div>
    </main>
  );
};

export default SecondPage;

// http://localhost:3000 || http://localhost:3000/es/second-page || http://localhost:3000/en/second-page
