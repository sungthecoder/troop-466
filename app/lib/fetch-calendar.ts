import { parse } from "~/lib/ical";

const TROOP_ID = 8087;
const API_URL = `https://api.scouting.org/advancements/events/calendar/${TROOP_ID}`;

export const fetchCalendar = async () => {
  const res = await fetch(API_URL);
  return parse(await res.text());
};
