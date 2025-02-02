import type {
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@netlify/remix-runtime";
import { useLoaderData } from "@remix-run/react";
import { ContactUs } from "./contact-us";
import { Hero } from "./hero";
import { UpcomingEvents } from "./upcoming-events";
import { type DeviceType, LatestActivities } from "./latest-activities";
import { upcomingEvents } from "~/lib/upcoming-events";
import { fetchCalendar } from "~/lib/fetch-calendar";
import { getAllFiles } from "~/lib/get-files-in-google-drive-folder";
import { getContact } from "~/lib/get-contact";
import MobileDetect from "mobile-detect";

export const meta: MetaFunction = () => {
  return [
    { title: "Davis Troop 466" },
    { name: "description", content: "Welcome to the website of Davis Troop 466!" },
  ];
};

const PHOTO_FOLDER_ID = "1CXo77MonNVRWyaPk0TwrCqwYB_S2IVj9";

const guessDeviceType = (userAgent: string | null): DeviceType => {
  const md = new MobileDetect(userAgent || "");
  if (md.tablet()) {
    return "tablet";
  }
  if (md.mobile()) {
    return "mobile";
  }
  return "desktop";
};

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const [allEvents, allFiles, contact] = await Promise.all([
    fetchCalendar(),
    getAllFiles(PHOTO_FOLDER_ID, { thumbnailSize: 400 }),
    getContact(),
  ]);
  const events = upcomingEvents(allEvents);
  const userAgent = request.headers.get("user-agent");
  const deviceType = guessDeviceType(userAgent);
  const { files } = allFiles;
  return { contact, events, files, deviceType };
};

export default function Index() {
  const { contact, events, files, deviceType } = useLoaderData<typeof loader>();
  return (
    <nav className="absolute top-0 w-full">
      <section>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><a>Homepage</a></li>
                <li><a>Portfolio</a></li>
                <li><a>About</a></li>
              </ul>
            </div>
          </div>
          <div className="navbar-end">
            <a className="btn btn-ghost text-xl" href="/">Troop 466</a>
          </div>
        </div>
      </section>
      <section>
        <Hero
          title="Welcome to Troop 466"
          lead="Located in Davis, California, Troop 466 is a group of scouts from grades 5-12 committed to following the scout oath and law. Troop meetings are on Mondays from 7-8:30 at St. Martin's Church, and campouts are monthly."
        />
      </section>
      <section>
        <LatestActivities files={files} deviceType={deviceType} />
      </section>
      <section className="py-12 bg-fixed bg-center bg-no-repeat bg-[url('/assets/image/topographic-map-background.jpg')]">
        <div className="mt-48">
          <UpcomingEvents events={events} />
        </div>
      </section>
      <section className="py-12 bg-troop466-200">
        <div className="h-20">FAQ</div>
      </section>
      <section className="py-12 bg-fixed bg-center bg-no-repeat bg-[url('/assets/image/topographic-map-background.jpg')]">
        <ContactUs {...contact} />
      </section>
      <footer className="footer bg-neutral text-neutral-content p-10"></footer>
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
    </nav>
  );
}
