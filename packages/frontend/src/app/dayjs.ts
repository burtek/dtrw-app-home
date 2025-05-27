import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import dayjsLocalizedFormat from 'dayjs/plugin/localizedFormat';
import dayjsRelativeTime from 'dayjs/plugin/relativeTime';


dayjs.locale('pl');
dayjs.extend(dayjsLocalizedFormat);
dayjs.extend(dayjsRelativeTime);

const showRelativeTimeIfLessThanDays = 7;

export function formatTime(datetime: string | Dayjs) {
    if (!datetime && process.env.NODE_ENV !== 'development') {
        return datetime;
    }
    const date = typeof datetime === 'string' ? dayjs(datetime || new Date()) : datetime;

    if (dayjs().diff(date, 'days') < showRelativeTimeIfLessThanDays) {
        return date.fromNow();
    }
    return date.format('ll');
}
