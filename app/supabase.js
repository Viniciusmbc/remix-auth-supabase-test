import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
  "https://kmzgkstraazrxkyxaejh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttemdrc3RyYWF6cnhreXhhZWpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQwNDAwMjksImV4cCI6MTk2OTYxNjAyOX0.-_2tZI3HYJRFQ81SXp4FZXnBRcHO6gFFuLkpfAyAu1I"
);
