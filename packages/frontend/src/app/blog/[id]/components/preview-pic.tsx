'use client';

/* eslint-disable @next/next/no-img-element */
import type { FC, MouseEventHandler, PropsWithChildren } from 'react';
import { useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useIsClient } from '../../../../isClient';
import styles from '../blogpost.module.scss';


type PreviewPicType = FC<{ src: string; title: string; previewSize?: number }>;
export const PreviewPic: PreviewPicType = ({ src, title, previewSize = 300 }) => {
    const renderDialog = useIsClient();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const openPicture = useCallback<MouseEventHandler>(event => {
        dialogRef.current?.showModal();
        event.preventDefault();
        document.documentElement.classList.add('no-scroll');
    }, []);
    const onDialogClosed = useCallback(() => {
        document.documentElement.classList.remove('no-scroll');
    }, []);
    const onDialogClick = useCallback<MouseEventHandler>(event => {
        if (event.target === dialogRef.current) {
            dialogRef.current.close();
        }
    }, []);

    return (
        <>
            <a
                className={styles.previewPic}
                href={src}
                target="_blank"
                rel="noreferrer noopener"
                onClick={openPicture}
            >
                <figure title={title}>
                    <img
                        title={title}
                        src={src}
                        alt={title}
                        height={previewSize}
                        width={previewSize}
                    />
                </figure>
            </a>
            {renderDialog && createPortal(
                <dialog
                    id={`preview-pic-dialog-${src}`}
                    className={styles.previewPicDialog}
                    ref={dialogRef}
                    // eslint-disable-next-line @eslint-react/dom-no-unknown-property
                    closedby="closerequest"
                    onClose={onDialogClosed}
                    onClick={onDialogClick}
                >
                    <div>
                        <figure
                            className={styles.previewPic}
                            onClick={openPicture}
                        >
                            <img
                                src={src}
                                alt={title}
                            />
                            <figcaption>{title}</figcaption>
                        </figure>
                    </div>
                </dialog>,
                document.body
            )}
        </>
    );
};
export const PreviewPicGallery: FC<PropsWithChildren> = ({ children }) => (
    <div className={styles.previewPicGallery}>
        {children}
    </div>
);
