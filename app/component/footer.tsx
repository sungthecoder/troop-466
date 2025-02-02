import { Link } from "@remix-run/react";
import React from "react";
import { SITE_NAME } from "~/lib/constants";

const COPY_RIGHT_YEAR = new Date().getFullYear();

type Icon8Icon = {
  name: string;
  url: string;
};

const icon8icnos: Array<Icon8Icon> = [];

const freepikImages = [
  {
    name: "Freepik",
    url: "https://www.freepik.com/free-vector/topographic-map-background_8967820.htm",
  },
  {
    name: "kjpargeter",
    url: "https://www.freepik.com/free-vector/red-grunge-background_1808442.htm",
  },
];

const Icon8Credits = () =>
  icon8icnos.length > 0 ? (
    <div className="text">
      {icon8icnos.map(({ name, url }, index, array) => (
        <React.Fragment key={name}>
          <a rel="noreferrer" target="_blank" href={url}>
            {name}
          </a>
          {index === array.length - 1 ? "" : ","}{" "}
        </React.Fragment>
      ))}
      icons by{" "}
      <a rel="noreferrer" target="_blank" href="https://icons8.com">
        Icons8
      </a>
    </div>
  ) : null;

const FreePikCredits = () => (
  <div className="">
    Images By{" "}
    {freepikImages.map(({ name, url }, index, array) => (
      <React.Fragment key={url}>
        <a rel="noreferrer" target="_blank" href={url}>
          {name}
        </a>
        {index === array.length - 1 ? "" : ","}{" "}
      </React.Fragment>
    ))}
    On Freepik
  </div>
);

export const Footer = () => {
  return (
    <footer className="footer footer-center bg-troop466-950 text-neutral-100 p-10">
      <div className="text font-bold">
        Copyright © {COPY_RIGHT_YEAR} {SITE_NAME}. All Rights Reserved.
        <div className="flex flex-row gap-4">
          <Link to="/terms">Terms of Service</Link> |{" "}
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>
      <div className="font-bold uppercase">
        <h6 className="text-md font-serif">Credits</h6>
        <FreePikCredits />
        <Icon8Credits />
      </div>
    </footer>
  );
};
