import type {
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@netlify/remix-runtime";
import { useLoaderData } from "@remix-run/react";
import showdown from "showdown";
import { CallToAction } from "./call-to-action";
import { ContactUs } from "./contact-us";
import { Hero } from "./hero";
import { UpcomingEvents } from "./upcoming-events";
import { type DeviceType, LatestActivities } from "./latest-activities";
import { Footer } from "~/component/footer";
import { PHOTO_ALBUM_SPREADSHEET_ID } from "~/lib/constants";
import { upcomingEvents } from "~/lib/upcoming-events";
import { fetchCalendar } from "~/lib/fetch-calendar";
import { getContact } from "~/lib/get-contact";
import { getHero } from "~/lib/get-hero";
import { getCallToAction } from "~/lib/get-call-to-action";
import MobileDetect from "mobile-detect";
import { NavBar } from "~/component/nav-bar";
import { getSheetAsJson } from "~/lib/get-google-sheet";
import { getCurrentUser } from "~/lib/session.server";

interface Album {
  date: string;
  title: string;
  shortDescription: string;
  googleAlbumUrl: string;
  thumbnailUrl: string;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Davis Troop 466" },
    {
      name: "description",
      content: "Welcome to the website of Davis Troop 466!",
    },
  ];
};

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
  const converter = new showdown.Converter();
  const [allEvents, albums, currentUser] = await Promise.all([
    fetchCalendar(),
    getSheetAsJson(PHOTO_ALBUM_SPREADSHEET_ID, "Sheet1!A1:E"),
    getCurrentUser(request),
  ]);
  const hero = getHero();
  const events = upcomingEvents(allEvents);
  const userAgent = request.headers.get("user-agent");
  const deviceType = guessDeviceType(userAgent);
  const contact = getContact();
  const cta = getCallToAction();
  const { faqs } = cta;
  const htmlFaqs = faqs.map(({ question, answer }) => ({
    question,
    answer: converter.makeHtml(answer),
  }));

  return {
    contact,
    cta,
    events,
    faqs: htmlFaqs,
    albums: (albums as unknown as Album[])
      .filter((album) => album.thumbnailUrl)
      .slice(0, 10),
    hero,
    deviceType,
    isLoggedIn: Boolean(currentUser),
  };
};

export default function Index() {
  const { contact, cta, events, faqs, albums, hero, deviceType, isLoggedIn } =
    useLoaderData<typeof loader>();
  return (
    <>
      <NavBar />
      <section>
        <Hero {...hero} />
      </section>
      <section>
        <LatestActivities
          albums={albums}
          deviceType={deviceType}
          isLoggedIn={isLoggedIn}
        />
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
        <CallToAction {...cta} faqs={faqs} />
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
