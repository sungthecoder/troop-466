import { CalEvent } from "~/lib/ical";
import { EventCard } from "~/component/event-card";

export const UpcomingEvents = ({ events }: { events: CalEvent[] }) => (
  <div className="flex flex-col container mx-auto">
    <div>
      <h2 className="font-bold text-nowrap text-center text-troop466-950 text-3xl">
        Upcoming Events
      </h2>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
    <div className="container px-6 m-auto">
      <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
        {events.map((e) => (
          <div className="col-span-4 lg:col-span-6 md:col-span-8">
            <EventCard key={e.uid} event={e} />
          </div>
        ))}
      </div>
    </div>
  </div>
);
