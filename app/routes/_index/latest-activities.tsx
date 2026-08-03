import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const RMCarousel = (
  Carousel as typeof Carousel & { default?: typeof Carousel }
).default ?? Carousel;

const deviceTypes = ["mobile", "tablet", "desktop"] as const;
export type DeviceType = (typeof deviceTypes)[number];

type LatestActivitiesProps = {
  albums: {
    date: string;
    title: string;
    googleAlbumUrl: string;
    thumbnailUrl: string;
  }[];
  deviceType: DeviceType;
  isLoggedIn: boolean;
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
  albums,
  deviceType,
  isLoggedIn,
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
      {albums.map((album) => {
        const year = new Date(album.date).toLocaleDateString("en-US", {
          year: "numeric",
        });
        const thumbnail = (
          <img
            className="absolute h-80 w-96 rounded-box object-cover shadow-xl"
            src={album.thumbnailUrl || "/assets/image/album-fallback.jpg"}
            alt={`Thumbnail for ${album.title}`}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = "/assets/image/album-fallback.jpg";
            }}
          />
        );

        return (
          <figure
            key={album.googleAlbumUrl}
            className="relative mx-auto h-80 w-96"
          >
            {isLoggedIn ? (
              <a
                href={album.googleAlbumUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`View ${album.title} photo album`}
              >
                {thumbnail}
              </a>
            ) : (
              thumbnail
            )}
            <figcaption className="absolute inset-x-0 bottom-0 m-2 rounded-md glass px-2 py-1 text-center">
              {album.title} ({year})
            </figcaption>
          </figure>
        );
      })}
    </RMCarousel>
  );
};
