'use client';
import Link from 'next/link';

import type { Post } from '#content';

import { formatTime } from '../dayjs';

import styles from './blog.module.scss';
import { Tags } from './components/tag';


function BlogPostItem({ post }: { post: Post }) {
    // const langs = post.langs && Object.keys(post.langs);

    return (
        <div className={styles.post}>
            <Link href={post.permalink}>
                <h2 className={styles.title}>{post.title}</h2>
            </Link>
            {/* {langs ? <div>{langs.map(lang => <span>+{lang}</span>)}</div> : null} */}
            <p className={styles.date}>{formatTime(post.created)}</p>
            <p className={styles.excerpt}>{post.ownExcerpt ?? `${post.excerpt}...`}</p>
            <Tags tags={post.tags} />
        </div>
    );
}

export function Blog({ posts, tag }: { posts: Post[]; tag?: string }) {
    return (
        <>
            <h1 className={styles.header}>Najnowsze wpisy{tag ? ` z kategorii ${tag}` : ''}:</h1>
            {tag
                ? <Link href="/blog">(pokaż wszystkie wpisy)</Link>
                : null}
            {posts.map(post => (
                <BlogPostItem
                    key={post.slug}
                    post={post}
                />
            ))}
        </>
    );
}
