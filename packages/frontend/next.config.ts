import { promises } from 'node:fs';
import { resolve } from 'node:path';

import type { NextConfig } from 'next';
import type { PHASE_TYPE } from 'next/constants';
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants';

import { generateRssFeed } from './build-utils/generate-rss.js';


async function makeConfig(phase: PHASE_TYPE): Promise<NextConfig> {
    // eslint-disable-next-line no-console
    console.log('Next.JS config', { phase });
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;
    const isBuild = phase === PHASE_PRODUCTION_BUILD;

    const nextConfig: NextConfig = {
        output: 'export',
        pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
        rewrites() {
            return Promise.resolve([
                {
                    source: '/api/:path*',
                    destination: 'http://localhost:4000/:path*'
                }
            ]);
        }
    };

    if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
        process.env.VELITE_STARTED = '1';
        const { build } = await import('velite');

        // https://github.com/zce/velite/issues/262
        const { warn } = console;
        // eslint-disable-next-line no-console
        console.warn = (...args) => {
            warn(...args);
            if (typeof args[1] === 'string' && args[1].startsWith('issues:')) {
                if (args[1].split('\n').some(line => line.startsWith(' error '))) {
                    if (!isDev) {
                        throw new Error('Schema validation failed');
                    }
                }
            }
        };
        await build({ watch: isDev, clean: !isDev /* , strict: !isDev */ });
        // eslint-disable-next-line no-console, require-atomic-updates
        console.warn = warn;
    }

    const posts = await promises.readFile('./.velite/posts.json', { encoding: 'utf-8' });
    await generateRssFeed(JSON.parse(posts), resolve('public/static/rss.xml'));

    return nextConfig;
}

export default makeConfig;
