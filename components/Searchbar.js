import { useRef, useState, useCallback } from "react";
import Cards from "./Cards";

export default function SearchBar({
  shows,
  data,
  onFocusHandler,
  title,
  userId,
}) {
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

  const onChange = useCallback(
    (event) => {
      const query = event.target.value;
      setQuery(query);

      if (query.length >= 2) {
        onFocusHandler(true);
        setActive(true);
        setResults(
          data.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
          )
        );
      } else {
        onFocusHandler(false);
        setResults([]);
        setActive(false);
      }
    },
    [data, onFocusHandler]
  );

  const onFocus = () => {
    window.addEventListener("click", onClick);
  };

  const onClick = useCallback(
    (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setActive(false);
        onFocusHandler(false);
        setQuery("");
        setResults([]);
        window.removeEventListener("click", onClick);
      }
    },
    [onFocusHandler]
  );

  return (
    <>
      <div className="flex p-4  md:pt-16" ref={searchRef}>
        <svg
          className="mr-4"
          width="32"
          height="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
            fill="#FFF"
          />
        </svg>
        <input
          placeholder={`Search for a ${shows}`}
          className="bg-darkBlue text-white  caret-red outline-offset-2 focus:border-0 placeholder:italic  w-60"
          type="search"
          onFocus={onFocus}
          onChange={onChange}
          value={query}
        />
      </div>
      <h1 className=" pb-6 pl-4 text-xl text-white">{title}</h1>

      {active && results.length && (
        <>
          <h2 className=" text-white text-lg ml-4 pb-6">
            {`Found ${results.length} results for "${query}"`}{" "}
          </h2>
          <section className=" grid grid-cols-2 mx-4 gap-4 mb-14 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
            {results.map(({ title, id, year, category, rating }) => (
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
          </section>
        </>
      )}
      {active && !results.length && (
        <h2 className=" text-white text-lg ml-4">{`No results found for "${query}"`}</h2>
      )}
    </>
  );
}
