/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
import countryNames from 'i18n-iso-countries';
import type { Metadata } from 'next';
import Flag from 'react-world-flags';

import type { Datum, ItemDatum } from './data';
import { data, mobileNames, mobilePrefixes } from './data';
import styles from './zagle.module.scss';


function SectionDescription({ descOrLegend }: { descOrLegend: Datum['descOrLegend'] }) {
    if (!descOrLegend) {
        return null;
    }

    return (
        <div className={styles.description}>
            {typeof descOrLegend === 'string' && <div>{descOrLegend}</div>}
            {Array.isArray(descOrLegend) && (
                <table>
                    <tbody>
                        {descOrLegend.map(legend => (
                            <tr key={legend.key}>
                                <td
                                    // eslint-disable-next-line @typescript-eslint/naming-convention
                                    dangerouslySetInnerHTML={{ __html: legend.key }}
                                    style={{ paddingRight: '.5em' }}
                                />
                                <td>{'- '}{legend.item}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

function LinkItem({ link }: { link: ItemDatum }) {
    return (
        <div className={styles.linkItem}>
            <div className={styles.linkHead}>
                {link.star ? <span className={styles.star}>⭐ </span> : null}
                <a
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {link.linkdesc ?? link.link}
                </a>
            </div>
            <div className={styles.linkAdditional}>
                {link.more
                    ? (
                        <ul className={styles.more}>
                            {link.more.map((more, moreIndex) => (
                                <li key={moreIndex}>
                                    {more.desc}
                                    :&nbsp;
                                    <a
                                        href={more.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {more.linkdesc ?? more.link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )
                    : null}
                {link.mobile
                    ? (
                        <ul className={styles.mobile}>
                            {link.mobile.map((mobile, mobileIndex) => (
                                <li key={mobileIndex}>
                                    <a
                                        href={`${mobilePrefixes[mobile.type]}${mobile.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {mobileNames[mobile.type](mobile.label)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )
                    : null}
            </div>
            <div className={styles.linkDesc}>
                {link.desc.desc
                    ? (
                        <div>
                            {link.desc.countryCode
                                ? (
                                    <>
                                        <Flag
                                            code={link.desc.countryCode}
                                            height={16}
                                        />
                                        {' '}
                                        {countryNames.getName(link.desc.countryCode, 'pl')}
                                        {': '}
                                    </>
                                )
                                : null}
                            {link.desc.desc}
                        </div>
                    )
                    : null}
                {'marineType' in link.desc && link.desc.marineType
                    ? (
                        <div>
                            <b>Mariny: </b>
                            {/* eslint-disable-next-line @typescript-eslint/naming-convention */}
                            <span dangerouslySetInnerHTML={{ __html: link.desc.marineType }} />
                            <br />
                            <b>Obszar: </b>
                            {/* eslint-disable-next-line @typescript-eslint/naming-convention */}
                            <span dangerouslySetInnerHTML={{ __html: link.desc.area }} />
                        </div>
                    )
                    : null}
            </div>
        </div>
    );
}

// function Toc({ sections }: { sections: Datum[] }) {
//     return (
//         <nav className={styles.toc}>
//             <ul>
//                 {sections.map(section => (
//                     <li key={section.id}>
//                         <a href={`#${section.id}`}>{section.title}</a>
//                     </li>
//                 ))}
//             </ul>
//         </nav>
//     );
// }

export default function SubPage() {
    return (
        <>
            {/* <Toc sections={data} /> */}
            {data.map(section => (
                <section
                    id={section.id}
                    key={section.id}
                    className={styles.section}
                >
                    <h2>{section.title}</h2>
                    <SectionDescription descOrLegend={section.descOrLegend} />
                    <div className={styles.links}>
                        {section.data.map((link, index) => (
                            <LinkItem
                                key={index}
                                link={link}
                            />
                        ))}
                    </div>
                </section>
            ))}
        </>
    );
}

export function generateMetadata(): Metadata {
    return { title: 'Linki żeglarskie - Dtrw.ovh' };
}
