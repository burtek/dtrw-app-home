import { getPageByName } from '#content';
import { useMDX } from '#velite';

import styles from './subpage.module.scss';


export default function SubPageContent({ subpage }: { subpage: string }) {
    const page = getPageByName(subpage);

    const { content } = useMDX({ code: page.code });

    return (
        <article className={styles.about}>
            {content}
        </article>
    );
}
