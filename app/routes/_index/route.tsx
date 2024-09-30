import type { MetaFunction } from "@netlify/remix-runtime";
import { useLoaderData } from "@remix-run/react";
import { Hero } from "./hero";
import { upcomingEvents } from "~/lib/upcoming-events";
import { fetchCalendar } from "~/lib/fetch-calendar";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const allEvents = await fetchCalendar();
  const events = upcomingEvents(allEvents);
  return { events };
};

export default function Index() {
  const { events } = useLoaderData<typeof loader>();
  return (
    <>
      <Hero
        title="Welcome to Troop 466"
        lead="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis lectus ut nibh laoreet pretium. Aliquam condimentum eget leo vitae mattis. Nam facilisis sem ut neque dapibus ultricies. Curabitur vel auctor magna, id elementum erat. "
      />
      {/**
       * TODO:
       *  * Upcoming events
       *  *
       */}
      <pre>{JSON.stringify(events, null, 2)}</pre>
    </>
  );
}
