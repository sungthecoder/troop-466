import ical from "ical.js";
import invariant from "tiny-invariant";

const validVEventFields = [
  "uid",
  "dtstamp",
  "created",
  "organizer",
  "dtstart",
  "dtend",
  "summary",
  "description",
  "url",
  "location",
];
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

export type CalEvent = Record<(typeof validVEventFields)[number], string>;

export function parse(text: string) {
  const jcal: JCalEvents = ical.parse(text);

  invariant(jcal, "Invalid response");
  invariant(jcal[0] === "vcalendar", "must be vcalendar");
  invariant(jcal[2], "invalid calendar object");
  return jcal[2].map(([name, fields]) => {
    invariant(name === "vevent", "must be vevent");
    return fields.reduce<CalEvent>((eventObj, [field, _, fieldType, value]) => {
      invariant(
        validEventFieldSet.has(field),
        `invalid event field: ${field}(${fieldType}): ${value}`
      );
      return {
        ...eventObj,
        [field]: value,
      };
    }, {});
  });
}
