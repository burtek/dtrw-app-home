import type { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';

import { getPostsByTag, posts } from '#content';

import { Blog } from '../../content';


interface Props {
    params: Promise<{ tag: string }>;
}

export default async function BlogPage({ params }: Props) {
    const { tag } = await params;
    const filteredPosts = getPostsByTag(decodeURIComponent(tag));

    return (
        <Suspense>
            <Blog
                posts={filteredPosts}
                tag={decodeURIComponent(tag)}
            />
        </Suspense>
    );
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { tag } = await params;
    const { category, description } = await parent;

    return {
        title: `tag: ${decodeURIComponent(tag)}`,
        description,
        category,
        alternates: {
            canonical: `https://dtrw.ovh/blog/tag/${decodeURIComponent(tag)}`,
            types: { 'application/rss+xml': [{ url: '/static/rss.xml', title: 'Blog RSS' }] }
        }
    };
}

export function generateStaticParams() {
    return [...new Set(posts.flatMap(post => post.tags).flatMap(tag => [tag, encodeURIComponent(tag)]))].map(tag => ({ tag }));
}
