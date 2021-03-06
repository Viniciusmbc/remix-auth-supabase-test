// RemixTools
import { useMatches, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

// Components
import Cards from "components/Cards";
import Trending from "components/Trending";
import SearchBar from "components/Searchbar";

// React hooks
import {useState} from "react"

// Supabase
import {supabaseClient} from "app/supabase";

export const loader = async () => {
  // Get trending shows
  const { data: trendings, error } = await supabaseClient
    .from("Shows")
    .select()
    .eq("isTrending", true);

    if (error) {
        throw new Error(error);
      }

    return json({
        trendings,
    }
        
    );
  };

export default function Home() {
    // Search state
  const [searchActive, setSearchActive] = useState(false);

  // Loading data
    const { trendings} = useLoaderData();

    // Get
    const rootData = useMatches().map(match => match.data)[1];
    const {allshows,  userId  } = rootData;
    console.log( userId);
 
     // If search state is active, show the data
  const checkSearchStatus = (status) => {
    status ? setSearchActive(true) : setSearchActive(false);
  };

  return (
      <section>
       
        <SearchBar
        shows={"movies or TV series"}
        data={allshows}
        onFocusHandler={(status) => checkSearchStatus(status)}
        userId={userId}
      />

      {!searchActive && (
        <section>
        <h1 className=" pl-4 text-xl text-white mb-4">Trending</h1>
        <article className="flex  w-full overflow-x-auto">
            {!!trendings &&
              trendings.map(({ title, year, category, rating }, index) => (
                <Trending
                  key={index}
                  title={title}
                  year={year}
                  category={category}
                  rating={rating}
                />
              ))}
          </article>

          <h2 className="text-white mt-10 mb-8 text-xl ml-4">Recommended for you</h2>

          <article className=" grid grid-cols-2 mx-4 gap-4 mb-14 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
          {!!allshows &&
            allshows.map(({ id, title, year, category, rating }) => (
              <Cards
                key={id}
                id={id}
                title={title}
                year={year}
                category={category}
                classificao={rating}
                userId={userId}
              />
            ))}
        </article>
      </section>
      )
        }
 
      </section>
     
     
    )
    

  }