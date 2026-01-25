import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPath = window.location.pathname;
  const currentQuery = searchParams.get("search_query");

  // Early Return pattern
  if (!isMenuOpen) return null;

  const handleShorts = () => {
    navigate("/?search_query=shorts");
  };

  const handleVideos = () => {
    navigate("/");
  };

  const handleLive = () => {
    navigate("/?search_query=live");
  };

  const isActive = (path, query = null) => {
    if (query) {
      return currentQuery === query;
    }
    return currentPath === path && !currentQuery;
  };

  return (
    <div className="p-5 shadow-lg w-48">
      <ul>
        <li className="py-2">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-lg hover:bg-gray-100 ${
              isActive("/") ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            Home
          </Link>
        </li>
        <li className="py-2">
          <button
            onClick={handleShorts}
            className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 ${
              isActive("/", "shorts") ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            Shorts
          </button>
        </li>
        <li className="py-2">
          <button
            onClick={handleLive}
            className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 ${
              isActive("/", "live") ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            Live
          </button>
        </li>
      </ul>
      <h1 className="font-bold pt-5">Subscriptions</h1>
      <ul>
        <li className="py-1">
          <button
            onClick={() => navigate("/?search_query=music")}
            className="w-full text-left px-3 py-1 rounded-lg hover:bg-gray-100"
          >
            Music
          </button>
        </li>
        <li className="py-1">
          <button
            onClick={() => navigate("/?search_query=sports")}
            className="w-full text-left px-3 py-1 rounded-lg hover:bg-gray-100"
          >
            Sports
          </button>
        </li>
        <li className="py-1">
          <button
            onClick={() => navigate("/?search_query=gaming")}
            className="w-full text-left px-3 py-1 rounded-lg hover:bg-gray-100"
          >
            Gaming
          </button>
        </li>
        <li className="py-1">
          <button
            onClick={() => navigate("/?search_query=movies")}
            className="w-full text-left px-3 py-1 rounded-lg hover:bg-gray-100"
          >
            Movies
          </button>
        </li>
      </ul>
      <h1 className="font-bold pt-5">Watch Later</h1>
      <ul>
        <li className="py-1">
          <button
            onClick={() => navigate("/?search_query=music")}
            className="w-full text-left px-3 py-1 rounded-lg hover:bg-gray-100"
          >
            Music
          </button>
        </li>
        <li className="py-1">
          <button
            onClick={() => navigate("/?search_query=sports")}
            className="w-full text-left px-3 py-1 rounded-lg hover:bg-gray-100"
          >
            Sports
          </button>
        </li>
        <li className="py-1">
          <button
            onClick={() => navigate("/?search_query=gaming")}
            className="w-full text-left px-3 py-1 rounded-lg hover:bg-gray-100"
          >
            Gaming
          </button>
        </li>
        <li className="py-1">
          <button
            onClick={() => navigate("/?search_query=movies")}
            className="w-full text-left px-3 py-1 rounded-lg hover:bg-gray-100"
          >
            Movies
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
