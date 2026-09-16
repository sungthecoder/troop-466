import { parse } from "~/lib/ical";

const TROOP_ID = 8087;
const API_URL = `https://api.scouting.org/advancements/events/calendar/${TROOP_ID}`;

export const fetchCalendar = async () => {
  // The Scout API returns 404 to Node's default `User-Agent: node`, despite
  // serving the same URL to browsers and other clients.
  const res = await fetch(API_URL, {
    headers: {
      "User-Agent": "Troop-466-calendar/1.0",
    },
  });
  const body = await res.text();

  if (!res.ok) {
    throw new Error(
      `Calendar API request failed (${res.status} ${res.statusText}).`
    );
  }

  // `ical.js` assumes it has already seen BEGIN:VCALENDAR before parsing a
  // parameterized content line. An HTML or JSON error response otherwise
  // surfaces as its unhelpful "reading 'param'" TypeError.
  const calendar = body.replace(/^\uFEFF/, "");
  if (!/^BEGIN:VCALENDAR(?:\r?\n|\r)/i.test(calendar)) {
    throw new Error(
      "Calendar API returned a response that is not an iCalendar document."
    );
  }

  return parse(calendar);
};
