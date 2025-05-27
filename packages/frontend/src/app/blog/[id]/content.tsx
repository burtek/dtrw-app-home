import type { Post } from '#content';
import { useMDX } from '#velite';

import { Tags } from '../components/tag';

import styles from './blogpost.module.scss';
import * as mdxComponents from './components';
import { BlogPublishTime } from './published';
import { ShortLink } from './shortLink';


export function BlogPost({ post }: { post: Post }) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { Content } = useMDX(post.code);

    function renderTocEntry(tocItem: Post['toc'][number]) {
        return (
            <li key={tocItem.url}>
                <a href={tocItem.url}>
                    {tocItem.title}
                </a>
                {tocItem.items.length ? <ol>{tocItem.items.map(renderTocEntry)}</ol> : null}
            </li>
        );
    }

    return (
        <article className={styles.post}>
            <h1 className={styles.title}>
                {post.title}
                <ShortLink short={post.short} />
            </h1>
            <p className={styles.published}>
                <BlogPublishTime post={post} />
            </p>
            <Tags
                tags={post.tags}
                className={styles.tags}
            />
            {post.tocEnabled && post.toc.length
                ? (
                    <article className={styles.toc}>
                        <h2>Spis treści</h2>
                        <ol>
                            {post.toc.map(renderTocEntry)}
                        </ol>
                    </article>
                )
                : null}
            <article className={styles.main}>
                <Content components={mdxComponents} />
            </article>
        </article>
    );
}
