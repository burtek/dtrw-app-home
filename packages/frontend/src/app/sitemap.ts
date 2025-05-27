import type { MetadataRoute } from 'next';

import { pages, posts } from '#content';


// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://dtrw.ovh',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1
        },
        ...pages.map<MetadataRoute.Sitemap[number]>(page => ({
            url: `https://dtrw.ovh/${page.name}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5
        })),
        {
            url: 'https://dtrw.ovh/blog',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8
        },
        {
            url: 'https://dtrw.ovh/zagle',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5
        },
        {
            url: 'https://dtrw.ovh/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5
        },
        ...posts.map<MetadataRoute.Sitemap[number]>(post => ({
            url: `https://dtrw.ovh/blog/${post.id}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1
        }))
    ];
}
