// Nextjs
import { NavLink } from "@remix-run/react";

// Icons
import { HomeIcon, MoviesIcon, TVIcon, BookmarkIcon } from "./Icons";

export default function Navbar() {
  const activeStyle = {
    fill: "#FFF",
  };

  return (
    <nav className="flex items-center justify-between bg-semiDarkBlue py-5 px-4 h-1/4 md:flex-col md:ml-8  md:rounded-2xl md:justify-start md:mr-9 md:h-[91vh] md:mt-8 ">
      <svg width="33" height="27" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z"
          fill="#FC4747"
        />
      </svg>
      <div className="flex md:flex-col md:gap-y-10 md:mt-20 ">
        <NavLink to="/dashboard/home">
          <HomeIcon
            style={({ isActive }) => (isActive ? activeStyle : "#5A698F")}
          />
        </NavLink>
        <NavLink to="/dashboard/movies">
          <MoviesIcon
            style={({ isActive }) => (isActive ? activeStyle : "#5A698F")}
          />
        </NavLink>
        <NavLink to="/dashboard/tvseries/">
          <TVIcon
            style={({ isActive }) => (isActive ? activeStyle : "#5A698F")}
          />
        </NavLink>
        <NavLink to="/dashboard/bookmarkeds/">
          <BookmarkIcon
            style={({ isActive }) => (isActive ? activeStyle : "#5A698F")}
          />
        </NavLink>
      </div>

      <div className=" md:mt-auto"></div>
    </nav>
  );
}
