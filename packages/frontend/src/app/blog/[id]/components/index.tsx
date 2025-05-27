import type { FC, PropsWithChildren } from 'react';

import styles from '../blogpost.module.scss';


export const Idea: FC<PropsWithChildren> = ({ children }) => <blockquote className={styles.idea}>{children}</blockquote>;

export const SideQuote: FC<PropsWithChildren> = ({ children }) => <blockquote className={styles.sideQuote}>{children}</blockquote>;
