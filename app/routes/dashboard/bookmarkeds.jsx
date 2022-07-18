// React hooks
import { useState } from "react";

// Components
import SearchBar from "components/Searchbar";
import Cards from "components/Cards";
import Title from "components/Title";

// Remix tools
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// Supabase
import { supabaseClient } from "app/supabase";

// Authentication
import { authenticator, sessionStorage } from "~/auth.server";

export const loader = async ({request}) => {

  const sessionActually = await sessionStorage.getSession(
    request.headers.get("Cookie")
  )
  const userId= await sessionActually.get(authenticator.sessionKey)?.user?.id
 
  // Get bookmarked shows
  const { data, error } = await supabaseClient
    .from("userfavoriteshows")
    .select("shows_id, Shows(*)")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error);
  }

  const bookmarkedShows = data?.map(({ Shows }) => {
    return Shows;
  });

  const bookmarkedMovies = bookmarkedShows?.filter(({ category }) => {
    return category === "Movie";
  });

  const bookmarkedTVseries = bookmarkedShows?.filter(({ category }) => {
    return category === "TV Series";
  });

  return json({
    userId,
    bookmarkedShows,
    bookmarkedMovies,
    bookmarkedTVseries
  });
  
}

export default function Bookmarked() {

  // Bookmarked shows
  const {bookmarkedShows,   bookmarkedMovies,
    bookmarkedTVseries, userId} = useLoaderData();

  // Search state
  const [searchActive, setSearchActive] = useState(false);

  // If search state is active, show the data
  const checkSearchStatus = (status) => {
    if (status) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  };

  return (
    <>    
      {bookmarkedShows.length === 0 ? (
        <Title title={"You don't have a bookmarked shows!"} />
      ) : (
       
        <section className=" w-full">
          <SearchBar
            shows={"bookmarked shows"}
            data={bookmarkedShows}
            onFocusHandler={(status) => checkSearchStatus(status)}
          />
          {!searchActive && bookmarkedMovies.length > 0 && (
            <>
              <Title title={"Bookmarked Movies"} />
              <article className=" grid grid-cols-2 mx-4 gap-4 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
                {bookmarkedMovies.map(
                  ({ title, year, category, rating, id }, index) => (
                    <Cards
                    key={id}
                    id={id}
                    title={title}
                    year={year}
                    category={category}
                    classificao={rating}
                    userId={userId}
                    />
                  )
                )}
              </article>
            </>
          )}
          {!searchActive && bookmarkedTVseries.length > 0 && (
            <>
              <Title
                title={"Bookmarked TV Series"}
                bookmarkedtvSeries={bookmarkedMovies.length > 0 ? true : false}
              />
              <article className=" grid grid-cols-2 mx-4 gap-4 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
                {bookmarkedTVseries.map(
                  ({ title, year, category, rating, id }, index) => (
                    <Cards
                    key={id}
                    id={id}
                    title={title}
                    year={year}
                    category={category}
                    classificao={rating}
                    userId={userId}
                    />
                  )
                )}
              </article>
            </>
          )}
        </section>
      )}

    )
    
    </>

  );
}