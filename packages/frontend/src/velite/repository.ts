import { posts as allPosts, pages } from '../../.velite';


export const posts = allPosts
    .filter(post => !post.draft)
    .sort((post1, post2) => -post1.created.localeCompare(post2.created));

export const getPostById = (id: string) => posts.find(post => post.id === id);

export const getPostByShort = (short: string) => posts.find(post => post.short === short);

export const getPostsByTag = (tag: string) => posts.filter(post => post.tags.includes(tag));

export const getPageByName = (name: string) => {
    const found = pages.find(page => page.name === name);
    if (!found) {
        throw new Error(`PAGE ${name} NOT GENERATED!`);
    }
    return found;
};

export { pages } from '../../.velite';
export type { Page, Post } from '../../.velite';
