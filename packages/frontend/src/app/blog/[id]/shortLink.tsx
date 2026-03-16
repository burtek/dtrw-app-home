'use client';
import { useCallback } from 'react';

import styles from './blogpost.module.scss';


export const ShortLink = ({ short }: { short?: string }) => {
    const link = short ? `${document.location.origin}/b/${short}` : short;

    const onClick = useCallback(() => {
        if (link) {
            void navigator.clipboard.writeText(link);
        }
    }, [link]);

    if (!link) {
        return null;
    }

    return (
        <span
            className={styles.short}
            title={`Skopiuj krótki link do tego posta: ${link}`}
            onClick={onClick}
        >
            {short}
        </span>
    );
};
