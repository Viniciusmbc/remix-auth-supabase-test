// React hooks
import { useState } from "react";

// Components
import SearchBar from "components/Searchbar";
import Cards from "components/Cards";
import Title from "components/Title";

// Remix tools
import { useMatches } from "@remix-run/react";

export default function Bookmarked() {

 const rootData = useMatches().map(match => match.data)[0];
 const { tvshows, userId, bookmarkedShows  } = rootData;
 const bookmarkedShows = data.map(({ Shows }) => {
    return Shows;
  });

  const bookmarkedMovies = bookmarkedShows?.filter(({ category }) => {
    return category === "Movie";
  });

  const bookmarkedTVseries = bookmarkedShows?.filter(({ category }) => {
    return category === "TV Series";
  });

  console.log(bookmarkedShows.length, bookmarkedTVseries);

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
        <main className=" w-full">
          <SearchBar
            shows={"bookmarked shows"}
            data={bookmarkedShows}
            onFocusHandler={(status) => checkSearchStatus(status)}
          />
          {bookmarkedMovies.length > 0 && (
            <>
              <Title title={"Bookmarked Movies"} />
              <section className=" grid grid-cols-2 mx-4 gap-4 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
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
              </section>
            </>
          )}
          {bookmarkedTVseries.length > 0 && (
            <>
              <Title
                title={"Bookmarked TV Series"}
                bookmarkedtvSeries={bookmarkedMovies.length > 0 ? true : false}
              />
              <section className=" grid grid-cols-2 mx-4 gap-4 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
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
              </section>
            </>
          )}
        </main>
      )}
    </>
  );
}