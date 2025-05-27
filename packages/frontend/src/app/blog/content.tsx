import Link from 'next/link';

import type { Post } from '#content';

import { formatTime } from '../dayjs';

import styles from './blog.module.scss';
import { Tags } from './components/tag';


export function Blog({ posts, tag }: { posts: Post[]; tag?: string }) {
    return (
        <>
            <h1 className={styles.header}>Najnowsze wpisy{tag ? ` z kategorii ${tag}` : ''}:</h1>
            {tag
                ? <Link href={{ query: { tag: null } }}>(pokaż wszystkie wpisy)</Link>
                : null}
            {posts.map(post => (
                <div
                    key={post.slug}
                    className={styles.post}
                >
                    <Link href={post.permalink}>
                        <h2 className={styles.title}>{post.title}</h2>
                    </Link>
                    <p className={styles.date}>{formatTime(post.created)}</p>
                    <p className={styles.excerpt}>{post.ownExcerpt ?? `${post.excerpt}...`}</p>
                    <Tags tags={post.tags} />
                </div>
            ))}
        </>
    );
}
