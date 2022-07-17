// React Hooks
import { useEffect, useState } from "react";

// supabase
import { supabaseClient } from "app/supabase";

// Icons
import { LoadingSpinner } from "./Icons";

// Function to change name of image src
import { changeImageSrc } from "utils/changeImageSrc.ts";

// Remix tools
import { Form } from "@remix-run/react";

export default function Cards({
  id,
  title,
  year,
  category,
  classificao,
  userId,
}) {
  const [bookmarkedShowsId, setBookmarkedShowsId] = useState(new Set());
  const [bookmark, setBookmark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const { data, error } = await supabaseClient
        .from("userfavoriteshows")
        .select("*")
        .eq("user_id", userId);
      if (error) {
        console.log(`Error: ${error}`);
      } else {
        setIsLoading(false);
        const id = data.map((item) => item.shows_id && item.shows_id);
        setBookmarkedShowsId(new Set(id));
      }
    };

    getData();
    setIsLoading(false);
  }, [userId]);

  // If user click on the bookmark button, add the show to the user's bookmarked shows
  const addToBookmarkeds = async (id) => {
    setIsLoading(true);
    const { data, error } = await supabaseClient
      .from("userfavoriteshows")
      .insert({
        user_id: userId,
        shows_id: id,
      })
      .single();
    if (error) {
      console.log(`Error: ${error}`);
    } else {
      setBookmarkedShowsId((prev) => new Set(prev).add(data.shows_id));
      setIsLoading(false);
      setBookmark(true);
    }
  };

  // If user click on the bookmark button, remove the show from the user's bookmarked shows
  const removeBookmarkeds = async (id) => {
    setIsLoading(true);
    const { data, error } = await supabaseClient
      .from("userfavoriteshows")
      .delete()
      .eq("user_id", userId)
      .eq("shows_id", id);
    if (error) {
      console.log(`Error: ${error}`);
    } else {
      setBookmarkedShowsId((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      setIsLoading(false);
      setBookmark(false);
    }
  };

  // If user click on the bookmark button, add the show to the user's bookmarked shows or delete it from the user's bookmarked shows
  const handleBookmarked = async (id) => {
    console.log(id);
    bookmarkedShowsId.has(id) ? removeBookmarkeds(id) : addToBookmarkeds(id);
  };

  return (
    <div className=" flex-shrink-0">
      <div className="relative h-28 md:h-36 lg:h-[174px]">
        <figure className="block overflow-y-hidden inset-0 absolute min-w-full min-h-full">
          <img
            className=" block inset-0 rounded min-w-full min-h-full "
            src={`https://kmzgkstraazrxkyxaejh.supabase.co/storage/v1/object/public/thumbnails/${changeImageSrc(
              title
            )}/regular/medium.jpg`}
            alt={`${title} poster`}
          />
        </figure>
        <button
          onClick={() => handleBookmarked(id)}
          className=" flex items-center right-2 top-2 absolute bg-darkBlue/50  w-8 h-8 rounded-full z-10 md:right-4 md:top-4">
          {isLoading ? (
            <LoadingSpinner color={"#FFF"} />
          ) : bookmarkedShowsId.has(id) === true || bookmark ? (
            <svg
              className=" mx-auto"
              width="12"
              height="14"
              xmlns="http://www.w3.org/2000/svg">
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
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                stroke="#FFF"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="flex items-center mt-2">
        <p className="text-white/75 text-xs">{year}</p>
        <div className=" bg-white rounded-full w-1 h-1 mx-2"></div>
        <div>
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>

        <p className=" text-white/75 ml-2 text-xs">{category}</p>
        <div className=" bg-white rounded-full w-1 h-1 mx-2"></div>
        <p className=" text-white/75 text-xs">{classificao}</p>
      </div>
      <p className="text-white text-sm font-medium  mt-1">{title}</p>
    </div>
  );
}
