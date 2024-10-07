import linkifyStr from "linkify-string";
import { CalEvent } from "./ical";

export const upcomingEvents = (events: CalEvent[], count = 4) => {
  const now = new Date().getTime();

  return events
    .map((e) => ({
      ...e,
      start: new Date(e.dtstart).getTime(),
      descriptionHtml: linkifyStr(e.description),
    }))
    .filter((e) => e.start >= now)
    .sort((a, b) => a.start - b.start)
    .slice(0, count);
};

export type UpcomingEvent = ReturnType<typeof upcomingEvents>[number];
