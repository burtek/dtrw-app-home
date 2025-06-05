import type { Metadata } from 'next';

import styles from './page.module.scss';


export default function Home() {
    return (
        <div className={styles.page}>
            Witaj na głównej! Zajrzyj do bloga :)
        </div>
    );
}

export const metadata: Metadata = { title: { absolute: 'Dtrw.ovh' } };
