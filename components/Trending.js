// Icons
import { LoadingSpinner, MoviesIcon, TVIcon } from "./Icons";

// React Hooks
import { useState } from "react";

export default function Trending({
  year,
  category,
  rating,
  title,
  image,
  bookmarkShows,
  handleBookmarked,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkedShowsId, setbookmarkedShowsId] = useState(bookmarkShows);
  const [bookmark, setBookmark] = useState(false);

  return (
    <div className="relative ml-4 mr-2 w-9/12  max-w-md  flex-shrink-0 ">
      <button
        onClick={() => handleBookmarked(id)}
        className="  flex items-center right-2 top-2 absolute bg-darkBlue/50  w-8 h-8 rounded-full z-10 md:right-4 md:top-4"
      >
        {isLoading ? (
          <LoadingSpinner color={"#FFF"} />
        ) : bookmarkedShowsId?.has(id) === true || bookmark ? (
          <svg
            className=" mx-auto"
            width="12"
            height="14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
              stroke="#FFF"
              strokeWidth="1.5"
              fill="#FFF"
            />
          </svg>
        ) : (
          <svg
            className=" mx-auto"
            width="12"
            height="14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
              stroke="#FFF"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        )}
      </button>

      <div className=" bottom-10 left-4 absolute flex items-center z-10">
        <p className="text-white/75 text-xs">{year}</p>
        <div className=" bg-white rounded-full w-1 h-1 mx-2"></div>
        {category === "Movie" ? (
          <MoviesIcon color={"#FFF"} />
        ) : (
          <TVIcon color={"#FFF"} />
        )}

        <p className=" text-white/75 ml-2 text-xs">{category}</p>
        <div className=" bg-white rounded-full w-1 h-1 mx-2"></div>
        <p className=" text-white/75 text-xs">{rating}</p>
      </div>
      <div>
        {" "}
        <p className="absolute left-4 bottom-4 text-white text-sm z-10">
          {title}
        </p>
      </div>

      <img className="rounded" src={image} alt={`${title} poster`} />
    </div>
  );
}
