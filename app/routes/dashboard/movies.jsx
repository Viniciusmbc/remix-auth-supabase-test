// React Hooks
import {useState } from "react";

// Remix tools
import { useLoaderData, useMatches } from "@remix-run/react";
import { json } from "@remix-run/node";

// Components
import Cards from "components/Cards";
import SearchBar from "components/Searchbar";

// Supabase
import { supabaseClient } from "~/supabase";

export const loader = async () => {

    // Get Movies
    const { data: movies, error } = await supabaseClient
    .from("Shows")
    .select()
    .eq("category", "Movie");
   
   if(error){
     return json({
       error
     })
   }
   
   return json({ 
     movies,
   })
   
 };

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

  const {movies} = useLoaderData()
  console.log(movies)

  const rootData = useMatches().map(match => match.data)[1];
  const { userId  } = rootData;

  return (
   
      <section className=" w-full">
        <SearchBar
          shows={"Movies"}
          data={movies}
          onFocusHandler={(status) => checkSearchStatus(status)}
          title={"Movies"}
          userId={userId}
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