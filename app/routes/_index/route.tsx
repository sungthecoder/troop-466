import type { MetaFunction } from "@netlify/remix-runtime";
import { useLoaderData } from "@remix-run/react";
import { Hero } from "./hero";
import { UpcomingEvents } from "./upcoming-events";
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
    <div className="flex flex-col">
      <Hero
        title="Welcome to Troop 466"
        lead="Located in Davis, California, Troop 466 is a group of scouts from grades 5-12 committed to following the scout oath and law. Troop meetings are on Mondays from 7-8:30 at St. Martin's Church, and campouts are monthly."
      />
      <section className="py-12 bg-fixed bg-center bg-no-repeat bg-[url('/assets/image/topographic-map-background.jpg')]">
        <UpcomingEvents events={events} />
      </section>
      {/**
       * TODO Home page:
       *  * (Meetings are every Mondat @7PM in St. Martin's Church)
       *  * Photo carousel
       *  * Contact us
       *  * Recruting information e.g. FAQ
       * TODO About us page:
       *  * About us: where we meet, when we meet
       *  * Leadership
       *  * Connect with us
       * TODO: resources
       *  * Link to google drive
       *  * Link to scoutbook
       */}
    </div>
  );
}
