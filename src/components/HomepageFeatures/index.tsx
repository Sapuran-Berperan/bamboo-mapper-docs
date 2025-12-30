import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  emoji: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Bamboo Mapper',
    emoji: '🎋',
    description: (
      <>
        Aplikasi pemetaan lokasi bambu di Kecamatan Sapuran
        secara digital.
      </>
    ),
  },
  {
    title: 'Pemetaan Lokasi',
    emoji: '📍',
    description: (
      <>
        Menampilkan pinpoint lokasi bambu pada peta interaktif untuk
        memudahkan pendataan.
      </>
    ),
  },
  {
    title: 'Data Terstruktur',
    emoji: '📊',
    description: (
      <>
        Sistem pendataan bambu yang sistematis dan terorganisir untuk
        keperluan penelitian.
      </>
    ),
  },
];

function Feature({title, emoji, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <span className={styles.featureEmoji} role="img" aria-label={title}>
          {emoji}
        </span>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
