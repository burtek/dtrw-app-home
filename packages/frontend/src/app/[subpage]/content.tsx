import { getPageByName } from '#content';
import { useMDX } from '#velite';

import styles from './subpage.module.scss';


export default function SubPageContent({ subpage }: { subpage: string }) {
    const page = getPageByName(subpage);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { Content } = useMDX(page.code);

    return (
        <article className={styles.about}>
            <Content />
        </article>
    );
}
