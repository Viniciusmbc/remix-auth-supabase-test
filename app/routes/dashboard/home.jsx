// RemixTools
import { useParams, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

// Components
import Cards from "components/Cards";
import Trending from "components/Trending";
import SearchBar from "components/Searchbar";

// React hooks
import {useState} from "react"

// Supabase
import {supabaseClient} from "app/supabase" 

async function getLoaderData(userId) {
// Get user bookmarked shows
  const { data: bookmarked, error } = await supabaseClient
  .from("userfavoriteshows")
  .select("shows_id, Shows(*)")
  .eq("user_id", userId);

  if(error){
      throw new Error(error)
  }

    return bookmarked;
  }

export const loader = async ({params}) => {

     // Get all shows
  const { data: allshows, error } = await supabaseClient.from("Shows").select();

  // Get trending shows
  const { data: trendings } = await supabaseClient
    .from("Shows")
    .select()
    .eq("isTrending", true);

    // Get user bookmarked shows
  const { data: bookmarked } = await supabaseClient
  .from("userfavoriteshows")
  .select("shows_id, Shows(*)")
  .eq("user_id", params.userId);


    if (error) {
        throw new Error(error);
      }

    return json({
        allshows,
        trendings,
        bookmarked
    }
        
    );
  };

export default function Home() {
    // Search state
  const [searchActive, setSearchActive] = useState(false);

  // Loading data
    const {allshows, trendings, bookmarked} = useLoaderData();

 
     // If search state is active, show the data
  const checkSearchStatus = (status) => {
    status ? setSearchActive(true) : setSearchActive(false);
  };

  // Function to change titles in images cards src
  const changeImageSrc = (title) => {
    if (title === "Earth’s Untouched") {
      const earthsuntouched = "earths-untouched";
      return earthsuntouched;
    }
    const src = title
      .replace(/([^\w]+|\s+)/g, "-")
      .replace("II", "2")
      .toLowerCase();
    return src;
  };


    return (
      <>
        <SearchBar
        shows={"movies or TV series"}
        data={allshows}
        onFocusHandler={(status) => checkSearchStatus(status)}
      />

      {!searchActive && (
        <section>
        <h1 className=" pl-4 text-xl text-white mb-4">Trending</h1>
        <div className="flex  w-full overflow-x-auto">
            {trendings &&
              trendings.map(({ title, year, category, rating }, index) => (
                <Trending
                  key={index}
                  title={title}
                  year={year}
                  category={category}
                  rating={rating}
                  image={`https://kmzgkstraazrxkyxaejh.supabase.co/storage/v1/object/public/thumbnails/${changeImageSrc(
                    title
                  )}/trending/large.jpg`}
                />
              ))}
          </div>

          <h2 className="text-white text-xl ml-4">Recommended for you</h2>

          <article className=" grid grid-cols-2 mx-4 gap-4 mb-14 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
          {allshows &&
            allshows.map(({ id, title, year, category, rating }) => (
              <Cards
                bookmarkedShows={bookmarked}
                key={id}
                id={id}
                title={title}
                year={year}
                category={category}
                classificao={rating}
              />
            ))}
        </article>
      </section>
      )
        }
 
      </>
     
     
    )
    

  }