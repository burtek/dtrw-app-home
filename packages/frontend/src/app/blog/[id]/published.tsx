'use client';
import dayjs from 'dayjs';
import type { FC } from 'react';

import type { Post } from '#content';

import { formatTime } from '../../dayjs';


const Time: FC<{ datetime: string }> = ({ datetime }) => {
    const date$ = dayjs(datetime);
    return (
        <time
            dateTime={datetime}
            title={date$.format('LLL')}
        >
            {formatTime(date$)}
        </time>
    );
};

export function BlogPublishTime({ post }: { post: Post }) {
    return (
        <>
            {'Opublikowano: '}
            <Time datetime={post.created} />
            {post.created !== post.updated && (
                <>
                    {', '}
                    <a href={`https://github.com/burtek/homepage/commits/master/src/content/posts/${post.id}`}>
                        zaktualizowano
                    </a>
                    {': '}
                    <Time datetime={post.updated} />
                </>
            )}
        </>
    );
}
