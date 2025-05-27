import type { Metadata } from 'next';

import { getPageByName, pages } from '#content';

import SubPageContent from './content';


interface Props {
    params: Promise<{ subpage: string }>;
    // searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SubPage({ params }: Props) {
    const { subpage } = await params;

    return <SubPageContent subpage={subpage} />;
}

export async function generateMetadata(
    { params }: Props
    // parent: ResolvingMetadata
): Promise<Metadata> {
    const { subpage } = await params;
    const page = getPageByName(subpage);

    return { title: `${page.title} - Dtrw.ovh` };
}

export function generateStaticParams() {
    return pages.map(post => ({ subpage: post.name }));
}
