import { useEffect, useRef, useState } from "react";
import { DEFAULT_FLAIR, findFlair } from "~/lib/find-flair";
import type { UpcomingEvent } from "~/lib/upcoming-events";

export const EventCard = ({ event }: { event: UpcomingEvent }) => {
  const { summary, description, descriptionHtml, location, dtstart, url } =
    event;
  const startsAt = new Date(dtstart).toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "full",
    timeStyle: "short",
  });
  const flairRef = useRef<HTMLImageElement>(null);
  const [flairSrc, setFlairSrc] = useState(
    findFlair(`${summary} ${description} ${location}`)
  );
  const startDate = new Date(dtstart);
  const startMonth = startDate.toLocaleDateString("default", {
    month: "short",
  });
  const startDay = startDate.toLocaleDateString("default", { day: "numeric" });
  const startTime = startDate.toLocaleTimeString("default", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="card card-compact bg-base-100 w-auto shadow-xl h-full">
      <figure>
        <img
          src={flairSrc}
          ref={flairRef}
          alt="flair image"
          onError={() => setFlairSrc(DEFAULT_FLAIR)}
        />
      </figure>
      <div className="flex flex-grow flex-row">
        <div className="flex flex-col p-4 mx-4 justify-start text-center flex-grow-0 w-16 min-w-16 max-w-16">
          <div className="text-sm uppercase font-bold text-troop466-400">
            {startMonth}
          </div>
          <div className="mt-2 text-xl text-gray-900 font-bold">{startDay}</div>
          <div className="mt-2 text-xs text-gray-900">{startTime}</div>
        </div>
        <div className="card-body grow">
          <h2
            className="card-title overflow-hidden whitespace-normal text-ellipsis line-clamp-1 break-all"
            title={summary}
          >
            {summary}
          </h2>
          <p
            className="line-clamp-3 break-all"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
          <div className="card-actions justify-end">
            <a
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-primary"
            >
              RSVP
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
