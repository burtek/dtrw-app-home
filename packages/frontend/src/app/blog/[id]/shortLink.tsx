'use client';
import { useCallback, useEffect, useState } from 'react';

import styles from './blogpost.module.scss';


export const ShortLink = ({ short }: { short?: string }) => {
    const [link, setLink] = useState('');

    useEffect(() => {
        if (short) {
            setLink(`${document.location.origin}/b/${short}`);
        }
    }, [short]);

    const onClick = useCallback(() => {
        void navigator.clipboard.writeText(link);
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
