// Supabase 
import { supabaseClient } from ".././app/supabase"

// Get all Bookmarked shows

export const getBookmarkedShows = async (userId: string ) => {
const { data } = await supabaseClient
.from("userfavoriteshows")
.select("shows_id, Shows(*)")
.eq("user_id", userId);

const bookmarkedShows = data?.map(({ Shows }) => {
  return Shows;
});

    return bookmarkedShows;
}