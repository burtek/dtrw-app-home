import type { Metadata } from 'next';


export const metadata: Metadata = {
    title: {
        template: '%s - Blog - Dtrw.ovh',
        default: 'Blog - Dtrw.ovh'
    },
    description: 'Blog posts about various topics related to technology, programming, genealogy, and more.',
    category: 'Blog'
};


export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
