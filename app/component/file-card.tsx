import { drive_v3 } from "googleapis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@remix-run/react";

export const FileCard = ({
  file,
  linkTo,
}: {
  file: drive_v3.Schema$File;
  linkTo: string;
}) => {
  const {
    exportLinks,
    id,
    description,
    name,
    mimeType,
    webViewLink,
    thumbnailLink,
    createdTime,
  } = file;
  const createdYear = new Date(createdTime || "").toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
  });

  const createdMonth = new Date(createdTime || "").toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    month: "long",
  });

  return (
    <div className="card card-compact bg-base-100 w-auto shadow-xl h-full">
      <Link to={linkTo}>
        <figure>
          <img
            className="h-52 min-w-full rounded-md object-cover"
            src={thumbnailLink || "/assets/image/eagle.jpg"}
            alt="thumnail image"
          />
        </figure>
      </Link>
      <div className="flex flex-grow flex-row">
        <div className="flex flex-col p-4 mx-4 justify-start text-center flex-grow-0 w-16 min-w-16 max-w-16">
          <div className="text-sm uppercase font-bold text-troop466-400">
            {createdMonth}
          </div>
          <div className="mt-2 text-xl text-gray-900 font-bold">
            {createdYear}
          </div>
        </div>
        <div className="card-body grow">
          <h2
            className="card-title overflow-hidden whitespace-normal text-ellipsis line-clamp-1 break-all"
            title={name || "Project"}
          >
            {name}
          </h2>
          <p className="line-clamp-3 break-all">{description}</p>
          <div className="card-actions justify-end">
            {exportLinks && exportLinks["application/pdf"] ? (
              <a
                href={exportLinks["application/pdf"]}
                download
                className="btn btn-primary btn-circle text-white"
              >
                <FontAwesomeIcon icon={faFilePdf} />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
