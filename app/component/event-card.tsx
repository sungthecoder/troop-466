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
        <div className="flex flex-col p-4 mx-4 justify-start text-center">
          <div className="text-sm uppercase font-bold text-troop466-400">
            {startMonth}
          </div>
          <div className="mt-2 text-xl text-gray-900 font-bold">{startDay}</div>
        </div>
        <div className="card-body">
          <h2 className="card-title overflow-hidden whitespace-normal text-ellipsis line-clamp-1">
            {summary}
          </h2>
          <p
            className="line-clamp-3"
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
    // <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
    //   {/*  <!-- Image --> */}
    //   <figure className="relative">
    //     <img
    //       ref={flairRef}
    //       src={flairSrc}
    //       alt="flair image"
    //       className="object-cover"
    //       onError={() => setFlairSrc(DEFAULT_FLAIR)}
    //     />
    //     <figcaption className="flex flex-col gap-4 absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 p-6 text-white">
    //       <div>
    //         <h3 className="text-lg font-semibold">{summary}</h3>
    //         <p className="text-sm opacity-75">
    //           By {organizer} on {startsAt}
    //         </p>
    //       </div>
    //       <div className="text-sm">
    //         <p
    //           className="inline placeholder-opacity-100"
    //           dangerouslySetInnerHTML={{ __html: descriptionHtml }}
    //         />{" "}
    //         <span className="text-nowrap">
    //           (
    //           <a href={url} target="_blank">
    //             detail in scoutbook
    //           </a>
    //           )
    //         </span>
    //       </div>
    //     </figcaption>
    //   </figure>
    // </div>
  );
};
