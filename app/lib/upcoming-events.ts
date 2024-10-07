import linkifyStr from "linkify-string";
import { CalEvent } from "./ical";

export const upcomingEvents = (events: CalEvent[], count = 4) => {
  const now = new Date();

  return events
    .map((e) => ({
      ...e,
      start: new Date(e.dtstart),
      description: linkifyStr(e.description),
    }))
    .filter((e) => e.start >= now)
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, count);
};
