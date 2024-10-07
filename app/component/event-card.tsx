import { useEffect, useRef, useState } from "react";
import { CalEvent } from "~/lib/ical";
import { DEFAULT_FLAIR, findFlair } from "~/lib/find-flair";

export const EventCard = ({ event }: { event: CalEvent }) => {
  const { organizer, summary, description, location, dtstart, url } = event;
  const startsAt = new Date(dtstart).toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "full",
    timeStyle: "short",
  });
  const flairRef = useRef<HTMLImageElement>(null);
  const [flairSrc, setFlairSrc] = useState(
    findFlair(`${summary} $description} ${location}`)
  );

  return (
    <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
      {/*  <!-- Image --> */}
      <figure className="relative">
        <img
          ref={flairRef}
          src={flairSrc}
          alt="flair image"
          className="object-cover"
          onError={() => setFlairSrc(DEFAULT_FLAIR)}
        />
        <figcaption className="flex flex-col gap-4 absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 p-6 text-white">
          <div>
            <h3 className="text-lg font-semibold">{summary}</h3>
            <p className="text-sm opacity-75">
              By {organizer} on {startsAt}
            </p>
          </div>
          <div className="text-sm">
            <p
              className="inline placeholder-opacity-100"
              dangerouslySetInnerHTML={{ __html: description }}
            />{" "}
            <span className="text-nowrap">
              (
              <a href={url} target="_blank">
                detail in scoutbook
              </a>
              )
            </span>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};
