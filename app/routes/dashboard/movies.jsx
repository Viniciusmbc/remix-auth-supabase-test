// React Hooks
import {useState } from "react";

// Remix tools
import { useMatches } from "@remix-run/react";

// Components
import Cards from "components/Cards";
import SearchBar from "components/Searchbar";

export default function Movies() {
  // Search state
  const [searchActive, setSearchActive] = useState(false);
  const checkSearchStatus = (status) => {
    if (status) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  };

  const rootData = useMatches().map(match => match.data)[0];
  const {allshows, movies, userId  } = rootData;


  return (
   
      <section className=" w-full">
        <SearchBar
          shows={"Movies"}
          data={allshows}
          onFocusHandler={(status) => checkSearchStatus(status)}
          title={"Movies"}
        />

        {!searchActive && (
          <section className=" grid grid-cols-2 mx-4 gap-4 mb-14 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
            {movies.map(({ title, year, category, rating, id }) => (
              <Cards
              key={id}
              id={id}
              userId={userId}
              title={title}
              year={year}
              category={category}
              classificao={rating}
              />
            ))}
          </section>
        )}
      </section>
    
  );
}