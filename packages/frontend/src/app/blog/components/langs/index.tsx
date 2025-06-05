import Link from 'next/link';

import type { Post } from '#content';


const alsoAvailableLangs: Record<string, string> = {
    pl: 'Treść dostępna w języku polskim',
    en: 'Content available in English',
    de: 'Inhalt auf Deutsch verfügbar',
    es: 'Contenido disponible en español',
    fr: 'Contenu disponible en français',
    it: 'Contenuto disponibile in italiano',
    pt: 'Conteúdo disponível em português'
};

export function BlogPostLangLinks({ post }: { post: Post }) {
    if (!post.langs || !Object.keys(post.langs).length) {
        return null;
    }

    return (
        <div>
            {Object.entries(post.langs).map(([lang, url]) => (
                <Link
                    href={`/blog/${url}`}
                    key={lang}
                >
                    {alsoAvailableLangs[lang] ?? `Content available in ${lang.toUpperCase()}`}
                </Link>
            ))}
        </div>
    );
}
