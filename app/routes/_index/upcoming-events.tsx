import { EventCard } from "~/component/event-card";
import type { UpcomingEvent } from "~/lib/upcoming-events";

export const UpcomingEvents = ({ events }: { events: UpcomingEvent[] }) => (
  <div className="flex flex-col container mx-auto">
    <div>
      <h2 className="font-bold text-nowrap text-center text-troop466-950 text-3xl font-serif">
        Upcoming Events
      </h2>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
    <div className="mb-10 flex flex-row flex-wrap -m-2">
      {events.map((e) => (
        <div key={e.uid} className="items-stretch w-full lg:w-1/2 xl:w-1/3 p-2">
          <EventCard event={e} />
        </div>
      ))}
    </div>
  </div>
);
