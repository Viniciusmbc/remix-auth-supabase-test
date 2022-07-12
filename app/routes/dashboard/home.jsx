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

    // Params id
    const params = useParams()

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
        
        <div className=" bg-red">
     {bookmarked}


{allshows &&
            allshows.map(({ id, title, year, category, rating }) => (
              <Cards
              userId={params.userId}
                key={id}
                id={id}
                title={title}
                year={year}
                category={category}
                classificao={rating}
              />
            ))}
        
        </div>
    )
    

  }