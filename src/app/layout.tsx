import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.scss';
import styles from './layout.module.scss';


const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});

export const metadata: Metadata = {
    title: 'Dtrw.ovh',
    description: 'My personal website',
    generator: 'Next.JS, Velite',
    alternates: { types: { 'application/rss+xml': [{ url: '/static/rss.xml', title: 'Blog RSS' }] } },
    publisher: 'Bartosz Dotryw'
};

export default function RootLayout({
    children,
    header,
    footer
}: {
    children: React.ReactNode;
    header: React.ReactNode;
    footer: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} ${styles.app}`}>
                {header}
                <main>
                    {children}
                </main>
                {footer}
            </body>
        </html>
    );
}
