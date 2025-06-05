import { exec } from 'node:child_process';
import { promisify } from 'node:util';

import rehypeSlug from 'rehype-slug';
import { defineConfig, s } from 'velite';


// import dictionaryPl from 'dictionary-pl';
// import remarkRetext from 'remark-retext';
// import retextLatin from 'retext-latin';
// import retextSpell from 'retext-spell';
// import { unified } from 'unified';

const isDev = process.argv.includes('dev');
// const isBuild = process.argv.includes('build');

const execAsync = promisify(exec);
const timestamp = (type: 'created' | 'modified') =>
    s
        .custom<string | undefined>(i => i === undefined || typeof i === 'string')
        .transform<string>(async (value, { meta, addIssue }) => {
            const path = typeof meta.path === 'string' ? meta.path : '';
            const command = `git log -m --full-history --follow --format=%cI ${path} ${type === 'created' ? '| tac |' : '|'} head -n1`;
            if (value) {
                addIssue({ fatal: false, code: 'custom', message: '`s.timestamp()` schema will resolve the value from `git log` command' });
            }
            const { stdout } = await execAsync(command);
            const dateString = stdout.trim();
            const date = dateString ? new Date(dateString) : new Date();
            return date.toISOString();
        });

// console.log(`Starting veliteJS${isBuild ? ' with spellchecking' : ''}`);
export default defineConfig({
    root: 'src/content',
    collections: {
        posts: {
            name: 'Post',
            pattern: 'posts/*/index.mdx',
            schema: s
                .object({
                    title: s.string(),
                    short: s.slug('posts-short').optional(),
                    tags: s.array(s.string()),
                    tocEnabled: s.boolean().optional(),
                    draft: s.boolean().optional(),
                    ownExcerpt: s.string().optional(),

                    created: timestamp('created'),
                    updated: timestamp('modified'),
                    slug: s.path(),
                    metadata: s.metadata(),
                    excerpt: s.excerpt(),
                    code: s.mdx(),
                    toc: s.toc(),
                    md: s.markdown()
                })
                .transform((data, { addIssue }) => {
                    const [id] = data.slug.split('/').reverse();
                    if (!data.toc.length && data.tocEnabled) {
                        addIssue({ fatal: false, code: 'custom', message: 'TOC is enabled but no TOC entries have been generated' });
                    }
                    return {
                        ...data,
                        id,
                        permalink: `/blog/${id}`
                    };
                })
        },
        pages: {
            name: 'Page',
            pattern: 'pages/*.mdx',
            schema: s
                .object({
                    title: s.string(),

                    name: s.path().transform(path => path.split('/')[1]),
                    metadata: s.metadata(),
                    excerpt: s.excerpt(),
                    code: s.mdx(),
                    toc: s.toc(),
                    md: s.markdown()
                })
        }
    },
    mdx: {
        // https://github.com/zce/velite/issues/261
        // remarkPlugins: [
        //     [
        //         remarkRetext,
        //         unified()
        //             .use(retextLatin)
        //             .use(retextSpell, dictionaryPl)
        //     ]
        // ],
        rehypePlugins: [rehypeSlug],
        development: isDev
    }
});
