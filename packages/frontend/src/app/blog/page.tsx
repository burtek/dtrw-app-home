import type { Metadata } from 'next';
import { Suspense } from 'react';

import { getPosts } from '#content';

import { Blog } from './content';


export default function BlogPage() {
    return (
        <Suspense>
            <Blog posts={getPosts()} />
        </Suspense>
    );
}

export const metadata: Metadata = {
    title: { absolute: 'Blog - Dtrw.ovh' },
    description: 'Blog posts about various topics related to technology, programming, genealogy, and more.',
    category: 'Blog'
};
