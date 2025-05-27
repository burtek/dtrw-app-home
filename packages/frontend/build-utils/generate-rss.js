// @ts-check
import { promises } from 'node:fs';

import RSS from 'rss';


/** @import { Post } from '#content' */
/**
 * @param {Post[]} allPosts
 * @param {string} path
 * @returns {Promise<void>}
 */
export async function generateRssFeed(allPosts, path) {
    // eslint-disable-next-line no-undef
    const siteUrl = process.env.NODE_ENV === 'production'
        ? 'https://dtrw.ovh'
        : 'http://localhost:3000';

    /* eslint-disable camelcase */
    /** @type {RSS.FeedOptions} */
    const feedOptions = {
        title: 'Blog posts - Dtrw.ovh',
        description: 'Blog posts - Dtrw.ovh',
        site_url: siteUrl,
        feed_url: `${siteUrl}/rss.xml`,
        // image_url: `${siteUrl}/logo.jpeg`,
        pubDate: new Date(),
        copyright: `All rights reserved ${new Date().getFullYear()}`
    };
    /* eslint-enable camelcase */

    const feed = new RSS(feedOptions);

    allPosts.forEach(post => {
        feed.item({
            title: post.title,
            description: post.excerpt,
            url: `${siteUrl}/blog/${post.id}`,
            date: post.created,
            categories: post.tags
        });
    });

    // Write the RSS feed to a file as XML.
    await promises.writeFile(path, feed.xml({ indent: true }), { flag: 'w', encoding: 'utf-8' });
}
