import Link from 'next/link';
import type { FC, PropsWithChildren } from 'react';

import { getPostByShort } from '#content';

import styles from '../blogpost.module.scss';


export const Idea: FC<PropsWithChildren> = ({ children }) => <blockquote className={styles.idea}>{children}</blockquote>;

export const SideQuote: FC<PropsWithChildren> = ({ children }) => <blockquote className={styles.sideQuote}>{children}</blockquote>;

export const InternalLink: FC<{ short: string }> = ({ short }) => {
    const post = getPostByShort(short);
    return post && <Link href={`/blog/${post.id}`}>{post.title}</Link>;
};

export { PreviewPic, PreviewPicGallery } from './preview-pic';
