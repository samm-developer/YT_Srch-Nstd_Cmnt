import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Button = ({ name }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get("search_query");
  const isActive = currentQuery === name || (name === "All" && !currentQuery);

  const handleClick = () => {
    if (name === "All") {
      // Navigate to home page (no search query)
      navigate("/");
    } else {
      // Navigate to search results for this keyword
      navigate(`/?search_query=${encodeURIComponent(name)}`);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`px-5 py-2 m-2 rounded-lg transition-colors ${
          isActive
            ? "bg-black text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
