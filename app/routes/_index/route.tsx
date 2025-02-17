import type {
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@netlify/remix-runtime";
import { useLoaderData } from "@remix-run/react";
import { CallToAction } from "./call-to-action";
import { ContactUs } from "./contact-us";
import { Hero } from "./hero";
import { UpcomingEvents } from "./upcoming-events";
import { type DeviceType, LatestActivities } from "./latest-activities";
import { Footer } from "~/component/footer";
import { upcomingEvents } from "~/lib/upcoming-events";
import { fetchCalendar } from "~/lib/fetch-calendar";
import { getAllFiles } from "~/lib/get-files-in-google-drive-folder";
import { getContact } from "~/lib/get-contact";
import { getCallToAction } from "~/lib/get-call-to-action";
import MobileDetect from "mobile-detect";
import { NavBar } from "~/component/nav-bar";

export const meta: MetaFunction = () => {
  return [
    { title: "Davis Troop 466" },
    {
      name: "description",
      content: "Welcome to the website of Davis Troop 466!",
    },
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
  const [allEvents, allFiles] = await Promise.all([
    fetchCalendar(),
    getAllFiles(PHOTO_FOLDER_ID, { thumbnailSize: 400 }),
  ]);
  const events = upcomingEvents(allEvents);
  const userAgent = request.headers.get("user-agent");
  const deviceType = guessDeviceType(userAgent);
  const contact = getContact();
  const cta = getCallToAction();
  const { files } = allFiles;
  return { contact, cta, events, files, deviceType };
};

export default function Index() {
  const { contact, cta, events, files, deviceType } =
    useLoaderData<typeof loader>();
  return (
    <>
      <NavBar />
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
      <section
        id="cta"
        className="py-12 bg-fixed bg-center bg-no-repeat bg-[url('/assets/image/background-red-grunge.jpg')]"
      >
        <CallToAction {...cta} />
      </section>
      <section
        id="contact"
        className="py-12 bg-fixed bg-center bg-no-repeat bg-[url('/assets/image/topographic-map-background.jpg')]"
      >
        <ContactUs {...contact} />
      </section>
      <Footer />
      {/**
       * TODO About us page:
       *  * About us: where we meet, when we meet
       *  * Leadership
       *  * Connect with us
       * TODO: resources
       *  * Link to google drive
       *  * Link to scoutbook
       */}
    </>
  );
}
