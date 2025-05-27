const portInfoAdditional = '⊕';
const portInfoCountry = (countryName: string) => `<sup>${countryName}</sup>`;

interface Link {
    link: string;
    linkdesc?: string;
}
interface Description {
    desc: {
        desc: string;
        countryCode?: string;

        marineType?: never;
        area?: never;
    } | {
        desc?: string;
        marineType: string;
        area: string;

        countryCode?: never;
    };
}

export interface ItemDatum extends Link, Description {
    more?: Array<Link & { desc: string }>;
    mobile?: Array<{
        type: MobileType;
        id: string;
        label?: string;
    }>;

    star?: boolean;
    // newItem?: boolean;
    // grey?: boolean;
}

export interface Datum {
    id: string;
    title: string;
    data: ItemDatum[];
    descOrLegend?: string | Array<{ key: string; item: string }>;
}

export const data: Datum[] = [
    {
        id: 'porty',
        title: 'Informacje o portach',
        descOrLegend: [
            {
                key: portInfoAdditional,
                item: 'dodatkowo niektóre mariny w niektórych innych rejonach'
            },
            {
                key: portInfoCountry('UK'),
                item: 'dotyczy tylko danego kraju'
            }
        ],
        data: [
            {
                link: 'https://portuj.pl/',
                desc: {
                    marineType: 'morskie i śródlądowe',
                    area: 'Polska'
                },
                mobile: [
                    {
                        type: 'android',
                        id: 'pl.portuj.portujpl'
                    },
                    {
                        type: 'ios',
                        id: 'portuj.pl/id1123472445'
                    }
                ],
                star: true
            },
            {
                link: 'https://skipper.adac.de/en/marinas/',
                linkdesc: 'https://skipper.adac.de/',
                desc: {
                    marineType: 'morskie i śródlądowe',
                    area: `Europa, Karaiby ${portInfoAdditional}`
                },
                star: true
            },
            {
                link: 'https://www.svenskagasthamnar.se/se/sok-via-karta',
                linkdesc: 'https://www.svenskagasthamnar.se/',
                desc: {
                    marineType: 'morskie i śródlądowe',
                    area: 'Szwecja i wyspy szwedzkie'
                }
            },
            {
                link: 'https://www.tyha.co.uk/marina-listing',
                linkdesc: 'https://www.tyha.co.uk/',
                desc: {
                    marineType: `morskie i śródlądowe ${portInfoCountry('UK')}`,
                    area: `Wyspy Brytyjskie i południowa Europa ${portInfoAdditional}`
                }
            },
            {
                link: 'https://www.danskehavnelods.dk',
                desc: {
                    marineType: 'morskie i śródlądowe',
                    area: 'Dania'
                }
            },
            {
                link: 'https://marinas.com',
                desc: {
                    marineType: 'morskie i śródlądowe',
                    area: 'cały Świat (śródlądowe tylko niektóre państwa)'
                },
                more: [
                    {
                        desc: 'Mapa',
                        linkdesc: '/map',
                        link: 'https://marinas.com/map?lat=55.29191668658319&lon=4.807571007164512&zoom=3.315265552181933'
                    }
                ]
            },
            {
                link: 'https://greek-marinas.gr/en/marina-listings/',
                linkdesc: 'https://greek-marinas.gr/',
                desc: {
                    marineType: 'morskie',
                    area: 'Grecja'
                }
            },
            {
                link: 'https://mymarinaguide.com',
                desc: {
                    marineType: 'morskie i śródlądowe',
                    area: 'Australia'
                }
            }
        ]
    },
    {
        id: 'meteo',
        title: 'Meteo i inne prognozy',
        data: [
            {
                link: 'https://windy.com',
                desc: { desc: 'Prognozy wiatrowe i meteo w formie mapy interaktywnej' },
                mobile: [
                    {
                        type: 'android',
                        id: 'com.windyty.android'
                    },
                    {
                        type: 'ios',
                        id: 'windytv-windyty/id1161387262'
                    }
                ],
                star: true
            },
            {
                link: 'http://pogodynka.pl',
                desc: { desc: 'Prognozy meteo i specjalistyczne, radary pogodowe, mapy synoptyczne' },
                more: [
                    {
                        desc: 'Radar na Polskę',
                        linkdesc: '/polska/radary',
                        link: 'http://pogodynka.pl/polska/radary'
                    },
                    {
                        desc: 'Radar na Europę',
                        linkdesc: '/radareuro',
                        link: 'http://pogodynka.pl/radareuro'
                    },
                    {
                        desc: 'Mapa synoptyczna PL',
                        linkdesc: '/polska/mapa_synoptyczna',
                        link: 'http://pogodynka.pl/polska/mapa_synoptyczna'
                    },
                    {
                        desc: 'Prognozy żeglarskie',
                        linkdesc: 'http://zagle.pogodynka.pl/',
                        link: 'http://zagle.pogodynka.pl/'
                    },
                    {
                        desc: 'Prognozy morskie',
                        linkdesc: 'http://baltyk.pogodynka.pl/',
                        link: 'http://baltyk.pogodynka.pl/'
                    }
                ],
                mobile: [
                    {
                        type: 'android',
                        id: 'com.pentacomp.pogodynkapogoda',
                        label: ' - pogoda IMGW'
                    },
                    {
                        type: 'android',
                        id: 'com.pentacomp.pogodynkaalert',
                        label: ' - ostrzeżenia IMGW'
                    }
                ],
                star: true
            },
            {
                link: 'https://www.ventusky.com',
                desc: { desc: 'Prognozy wiatrowe i meteo w formie mapy interaktywnej' },
                star: true
            },
            {
                link: 'http://model.ocean.univ.gda.pl/php/frame.php?area=Baltyk',
                desc: { desc: 'Prognoza ekohydrodynamiczna (m.in. prądy) na Bałtyk i Zatoki polskie}' }
            },
            {
                link: 'https://windguru.cz',
                desc: { desc: 'Prognozy wiatrowe i meteo' },
                mobile: [
                    {
                        type: 'android',
                        id: 'cz.windguru.wgapp'
                    }
                ],
                more: [
                    {
                        desc: 'Mapa',
                        linkdesc: '/map',
                        link: 'https://windguru.cz/map'
                    }
                ]
            },
            {
                link: 'https://meteoblue.com/pl/',
                desc: { desc: 'Prognozy numeryczne dla dowolnego miejsca na świecie' },
                mobile: [
                    {
                        type: 'android',
                        id: 'com.meteoblue.droid'
                    },
                    {
                        type: 'ios',
                        id: 'meteoblue/id994459137'
                    }
                ]
            },
            {
                link: 'https://nowe.meteo.pl',
                desc: { desc: 'Prognozy numeryczne na Europę Centralną i Północną (nowa wersja serwisu)' },
                mobile: [
                    {
                        type: 'android',
                        id: 'pl.atk.meteo'
                    }
                ],
                more: [
                    {
                        desc: 'Mapa interaktywna',
                        linkdesc: 'https://mapy.meteo.pl/',
                        link: 'https://mapy.meteo.pl/'
                    },
                    {
                        desc: 'Stara wersja serwisu',
                        linkdesc: 'https://meteo.pl/',
                        link: 'https://meteo.pl/'
                    }
                ]
            },
            {
                link: 'http://blids.de',
                desc: { desc: 'Niemiecka mapa wyładowań atmosferycznych na Polskę, UK, Niemcy itd.' }
            },
            {
                link: 'https://yr.no',
                desc: { desc: 'Norweski portal pogodowy' },
                mobile: [
                    {
                        type: 'android',
                        id: 'no.nrk.yr'
                    },
                    {
                        type: 'ios',
                        id: 'yr.no/id490989206'
                    }
                ]
            }
        ]
    },
    {
        id: 'mapy-mobilne',
        title: 'Mapy na urządzenia mobilne',
        data: [
            {
                link: 'http://navionics.com',
                desc: { desc: 'Navionics Boating' },
                mobile: [
                    {
                        type: 'android',
                        id: 'it.navionics.singleAppMarineLakes'
                    },
                    {
                        type: 'android',
                        id: 'it.navionics.singleAppMarineLakesHD',
                        label: 'Tablet'
                    },
                    {
                        type: 'ios',
                        id: 'boating-marine-lakes/id744920098'
                    }
                ],
                star: true
            },
            {
                link: 'https://opencpn.org',
                desc: { desc: 'Otwarte mapy nawigacyjne. Wymaga osobnego pobrania map z internetu' },
                mobile: [
                    {
                        type: 'PC',
                        id: 'https://opencpn.org/OpenCPN/info/downloadopencpn.html'
                    },
                    {
                        type: 'android',
                        id: 'org.opencpn.opencpn'
                    },
                    {
                        type: 'android',
                        id: 'org.opencpn.opencpn_free',
                        label: '- darmowa'
                    }
                ],
                star: true
            },
            {
                link: 'http://taider.pl',
                desc: { desc: 'Taider.pl - mapy mazurskie' },
                mobile: [
                    {
                        type: 'apk',
                        id: 'http://www.taider.pl/pliki/Taider.apk'
                    }
                ]
            }
        ]
    },
    {
        id: 'mapy-web',
        title: 'Mapy w przeglądarce',
        data: [
            {
                link: 'https://webapp.navionics.com',
                desc: { desc: 'Navionics Boating za darmo w przeglądarce - mapa interaktywna' },
                mobile: [
                    {
                        type: 'android',
                        id: 'it.navionics.singleAppMarineLakes'
                    },
                    {
                        type: 'android',
                        id: 'it.navionics.singleAppMarineLakesHD',
                        label: 'Tablet'
                    },
                    {
                        type: 'ios',
                        id: 'boating-marine-lakes/id744920098'
                    }
                ]
            }
        ]
    },
    {
        id: 'ostrzezenia',
        title: 'Ostrzeżenia nawigacyjne na Bałtyk',
        data: [
            {
                link: 'https://bhmw.gov.pl/pl/warnings/current/',
                linkdesc: 'https://bhmw.gov.pl',
                desc: {
                    desc: 'strona Biura Hydrograficznego Marynarki Wojennej',
                    countryCode: 'pl'
                }
            },
            {
                link: 'https://nautiskinformation.soefartsstyrelsen.dk/',
                linkdesc: 'https://nautiskinformation.soefartsstyrelsen.dk/',
                desc: {
                    desc: 'Dedykowana strona Ostrzeżeń Nawigacyjnych DUM',
                    countryCode: 'dk'
                },
                more: [
                    {
                        desc: 'Mapa',
                        linkdesc: '/#/messages/map',
                        link: 'https://nautiskinformation.soefartsstyrelsen.dk/#/messages/map'
                    },
                    {
                        desc: 'Strona Duńskiego Urzędu Morskiego',
                        linkdesc: 'https://www.dma.dk/',
                        link: 'https://www.dma.dk/'
                    }
                ]
            },
            {
                link: 'https://gis.vta.ee/navhoiatused/en.html',
                linkdesc: 'https://gis.vta.ee',
                desc: {
                    desc: 'strona Estońskiego Urzędu Transportu',
                    countryCode: 'ee'
                }
            },
            {
                link: 'https://extranet.liikennevirasto.fi/pooki_www/merivaroitukset/list_en.html',
                linkdesc: 'https://extranet.liikennevirasto.fi',
                desc: {
                    desc: 'strona Fińskiego Urzędu Transportu',
                    countryCode: 'fi'
                }
            },
            {
                link: 'https://hydro.eltsa.lt/nw/en.html',
                linkdesc: 'https://hydro.eltsa.lt/',
                desc: {
                    desc: 'strona Litewskiego Urzędu Bezpieczeństwa Morskiego',
                    countryCode: 'lt'
                }
            },
            {
                link: 'https://www.navtex.lv',
                desc: {
                    desc: 'lista łotewskich ostrzeżeń NAVTEX',
                    countryCode: 'lv'
                }
            },
            {
                link: 'https://www2.bsh.de/aktdat/nwn/nwn-ost.pdf',
                linkdesc: 'https://www.bsh.de',
                desc: {
                    desc: 'strona Niemieckiego Urzędu Transportu Morskiego i Hydrografii [PDF]',
                    countryCode: 'de'
                }
            },
            {
                link: 'https://kyvreports.kystverket.no/NavcoReport/navigasjonsvarsler.aspx',
                linkdesc: 'https://kyvreports.kystverket.no',
                desc: {
                    desc: 'strona Norweskiego Urzędu Morskiego',
                    countryCode: 'no'
                }
            },
            {
                link: 'https://navvarn.sjofartsverket.se/en/Navigationsvarningar/VHF',
                linkdesc: 'https://navvarn.sjofartsverket.se',
                desc: {
                    desc: 'strona Szwedzkiego Urzędu Morskiego',
                    countryCode: 'se'
                },
                more: [
                    {
                        desc: 'Navtex',
                        linkdesc: '/en/Navigationsvarningar/Navtex',
                        link: 'https://navvarn.sjofartsverket.se/en/Navigationsvarningar/Navtex'
                    }
                ]
            },
            {
                link: 'https://msi.admiralty.co.uk/RadioNavigationalWarnings',
                linkdesc: 'https://msi.admiralty.co.uk/',
                desc: {
                    desc: 'strona Biura Hydrograficznego Zjednoczonego Królestwa',
                    countryCode: 'gb'
                }
            }
        ]
    },
    // {
    //     title: 'Łączność VHF',
    //     data: [
    //         {
    //             link: 'http://www.dkscan.dk/maritim.htm',
    //             desc: {
    //                 desc: 'Lista używanych kanałów VHF na terytorium Danii [aktual. 16/08/2017]',
    //                 countryCode: 'dk'
    //             }
    //         }
    //     ]
    // },
    {
        id: 'inne',
        title: 'Inne strony i aplikacje warte uwagi',
        descOrLegend: 'Strony tu zawarte są wyłącznie moim subiektywnym wyborem; ich twórcy (o ile nie wskazano inaczej) nie mieli wpływu na pojawienie się tu tych stron.',
        data: [
            {
                link: 'https://www.sailforum.pl',
                desc: { desc: 'Żeglarskie forum dyskusyjne' },
                star: true
            },
            {
                link: 'http://navipedia.pl',
                desc: { desc: 'Navipedia - żeglarska encyklopedia' },
                star: true
            },
            {
                link: 'http://seabook.ozgurdogangunes.com/',
                desc: { desc: 'Podręczny zbiór przydatnych informacji' },
                mobile: [
                    {
                        type: 'android',
                        id: 'com.ozgurdogangunes.seabook'
                    },
                    {
                        type: 'android',
                        id: 'com.SeabookApp.seabook',
                        label: 'płatna'
                    },
                    {
                        type: 'ios',
                        id: 'seabook-maritime/id708215141'
                    },
                    {
                        type: 'ios',
                        id: 'seabook/id1517249755',
                        label: 'płatna'
                    },
                    {
                        type: 'PC',
                        id: 'http://seabook.ozgurdogangunes.com/download/seabook.exe'
                    }
                ],
                star: true
            },
            {
                link: 'http://www.kulinski.navsim.pl',
                desc: { desc: 'Subiektywny Serwis Internetowy Jerzego Kulińskiego' }
            },
            {
                link: 'http://seatracker.ru',
                desc: { desc: 'Marine Torrent Tracker' }
            }
        ]
    }
];

export const mobileNames = {
    'android'(label?: string) {
        return `Google Play (Android${label ? ` ${label}` : ''})`;
    },
    'ios'(label?: string) {
        return `App Store (iOS${label ? ` ${label}` : ''})`;
    },
    'windows'(label?: string) {
        return `Microsoft Store (Windows Phone${label ? ` ${label}` : ''})`;
    },
    'apk'(label?: string) {
        return `APK (Android${label ? ` ${label}` : ''})`;
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'PC'(label?: string) {
        return `Program komputerowy${label ? ` ${label}` : ''}`;
    }
} satisfies Record<string, (label?: string) => string>;
export type MobileType = keyof typeof mobileNames;

export const mobilePrefixes: Partial<Record<MobileType, string>> = {
    android: 'https://play.google.com/store/apps/details?id=',
    ios: 'https://apps.apple.com/pl/app/',
    windows: 'https://www.microsoft.com/pl-pl/store/p/'
};
