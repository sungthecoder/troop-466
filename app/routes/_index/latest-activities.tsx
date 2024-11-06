import { drive_v3 } from "googleapis";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// @ts-ignore
const RMCarousel = Carousel.default ? Carousel.default : Carousel;

const deviceTypes = ["mobile", "tablet", "desktop"] as const;
export type DeviceType = (typeof deviceTypes)[number];

type LatestActivitiesProps = {
  files: drive_v3.Schema$File[];
  deviceType: DeviceType;
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 2048 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 2048, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 499 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 499, min: 0 },
    items: 1,
  },
};

export const LatestActivities = ({
  files,
  deviceType,
}: LatestActivitiesProps) => {
  return (
    <RMCarousel
      className="h-96 -my-48"
      responsive={responsive}
      deviceType={deviceType}
      ssr
      autoPlay
      autoPlaySpeed={4000}
      infinite
      showDots
      removeArrowOnDeviceType={["tablet", "mobile"]}
    >
      {files
        .slice(0, 10)
        .filter((file) => file.thumbnailLink)
        .map((file) => (
          <figure key={file.id} className="w-96 h-80 relative mx-auto ">
            <img
              className="absoute h-80 w-96 object-cover rounded-box shadow-xl"
              src={file.thumbnailLink || ""}
              alt={file.description || "photo of scout"}
            />
            {file.description ? (
              <figcaption className="absolute inset-x-0 bottom-0 glass m-2 px-2 py-1 text-center rounded-md">
                {file.description}
              </figcaption>
            ) : null}
          </figure>
        ))}
    </RMCarousel>
  );
};
