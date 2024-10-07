import ical from "ical.js";
import invariant from "tiny-invariant";

const nullCalEvent = {
  uid: "" as string,
  dtstamp: "" as string,
  created: "" as string,
  organizer: "" as string,
  dtstart: "" as string,
  dtend: "" as string,
  summary: "" as string,
  description: "" as string,
  url: "" as string,
  location: "" as string,
} as const;

const validVEventFields = Object.keys(nullCalEvent);

const validTypes = ["text", "date-time", "cal-address", "uri"];

const validEventFieldSet = new Set(validVEventFields);

type Vevent = [
  "vevent",
  Array<
    [
      (typeof validVEventFields)[number],
      {},
      (typeof validTypes)[number],
      string
    ]
  >,
  []
];

type JCalEvents = ["vcalendar", [], Array<Vevent>];

export type CalEvent = typeof nullCalEvent;

export function parse(text: string) {
  const jcal: JCalEvents = ical.parse(text);

  invariant(jcal, "Invalid response");
  invariant(jcal[0] === "vcalendar", "must be vcalendar");
  invariant(jcal[2], "invalid calendar object");
  return jcal[2].map(([name, fields]) => {
    invariant(name === "vevent", "must be vevent");
    return fields.reduce<CalEvent>(
      (eventObj, [field, _, fieldType, value]) => {
        invariant(
          validEventFieldSet.has(field),
          `invalid event field: ${field}(${fieldType}): ${value}`
        );
        return {
          ...eventObj,
          [field]: value,
        };
      },
      { ...nullCalEvent }
    );
  });
}
