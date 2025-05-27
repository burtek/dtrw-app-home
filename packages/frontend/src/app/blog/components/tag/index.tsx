import classNames from 'classnames';
import Link from 'next/link';
import type { FC } from 'react';

import styles from './tag.module.scss';


export const Tags: FC<{ className?: string; tags: string[] }> = ({ className, tags }) => {
    if (!tags.length) {
        return null;
    }
    return (
        <div className={classNames(className, styles.tags)}>
            Tagi:
            {tags.map(tag => (
                <Link
                    href={{ pathname: '/blog', query: { tag } }}
                    key={tag}
                    className={styles.tag}
                >
                    <span>{tag}</span>
                </Link>
            ))}
        </div>
    );
};
