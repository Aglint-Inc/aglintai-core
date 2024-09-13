import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isToday from "dayjs/plugin/isToday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import duration from "dayjs/plugin/duration";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);
dayjs.extend(isToday);
dayjs.extend(weekOfYear);
dayjs.extend(duration);

export const dayjsLocal = dayjs;
