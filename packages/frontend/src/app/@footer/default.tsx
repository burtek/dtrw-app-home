import styles from './footer.module.scss';


export default function Footer() {
    return (
        <footer className={styles.footer}>
            <hr />
            <p>
                {'Powered by '}
                <a
                    rel="noopener noreferrer nofollow"
                    href="https://nextjs.org/"
                >
                    NextJS
                </a>
                {' and '}
                <a
                    rel="noopener noreferrer nofollow"
                    href="https://velite.js.org/"
                >
                    Velite
                </a>
                {', hosted on '}
                <a
                    rel="noopener noreferrer nofollow"
                    href="https://vercel.com"
                >
                    Vercel
                </a>
                {', source available on '}
                <a
                    rel="noopener noreferrer nofollow"
                    href="https://github.com/burtek/homepage"
                >
                    GitHub
                </a>
            </p>
        </footer>
    );
}
