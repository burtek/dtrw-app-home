import Link from 'next/link';

import styles from './header.module.scss';


export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">Dtrw.ovh</Link>
            </div>
            <div className={styles.menu}>
                <Link href="/blog">Blog</Link>
                <Link href="/zagle">Linki żeglarskie</Link>
                <Link href="/about">O mnie</Link>
            </div>
        </header>
    );
}
