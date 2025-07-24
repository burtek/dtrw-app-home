import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { getPostById, posts } from '#content';

import { BlogPost } from './content';


export const revalidate = false;
export const dynamic = 'error';

interface Props {
    params: Promise<{ id: string }>;
    // searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function BlogPostPage({ params }: Props) {
    const { id } = await params;
    const post = getPostById(id);

    if (!post) {
        redirect('/blog');
    }

    return (
        <Suspense>
            <BlogPost post={post} />
        </Suspense>
    );
}

export async function generateMetadata(
    { params }: Props
    // parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = await params;
    const post = getPostById(id);

    return {
        title: post?.title,
        description: post?.excerpt,
        category: post?.tags[0],
        alternates: {
            canonical: `https://dtrw.ovh/blog/${id}`,
            types: { 'application/rss+xml': [{ url: '/static/rss.xml', title: 'Blog RSS' }] }
        }
    };
}

export function generateStaticParams() {
    return posts.map(post => ({ id: post.id }));
}
