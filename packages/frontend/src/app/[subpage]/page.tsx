import type { Metadata } from 'next';

import { getPageByName, pages } from '#content';

import SubPageContent from './content';


export default async function SubPage({ params }: PageProps<'/[subpage]'>) {
    const { subpage } = await params;

    return <SubPageContent subpage={subpage} />;
}

export async function generateMetadata(
    { params }: PageProps<'/[subpage]'>
    // parent: ResolvingMetadata
): Promise<Metadata> {
    const { subpage } = await params;
    const page = getPageByName(subpage);

    return {
        title: page.title,
        alternates: {
            canonical: `https://dtrw.ovh/${subpage}`,
            types: { 'application/rss+xml': [{ url: '/static/rss.xml', title: 'Blog RSS' }] }
        }
    };
}

export function generateStaticParams() {
    return pages.map(post => ({ subpage: post.name }));
}
