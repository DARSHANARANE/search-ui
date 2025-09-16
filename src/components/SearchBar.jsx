import React from "react";
import { FiSearch } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SearchBar = ({ query, setQuery, loading }) => {
  return (
    <div className="flex items-center justify-between px-5 py-5">
      <div className="flex items-center flex-1 from-neutral-50 text-lg">
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin text-gray-400 mr-3" size={24} />
        ) : (
          <FiSearch className="text-gray-400 mr-3" size={24} />
        )}
        <input
          type="text"
          placeholder="Searching is easier"
          className="w-full bg-transparent outline-none text-black font-medium placeholder-gray-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {!query && (
        <div className="flex items-center justify-between">
          <div  className="ml-3 text-gray-400 font-medium text-xs border rounded-lg px-2 py-1.5">S</div>
          <div className="ml-3 text-sm text-gray-400 font-normal" >
            quick access
          </div>
        </div>
      )}
   
      {query && (
        <button
          onClick={() => setQuery("")}
          className="ml-3 text-sm black font-sm underline"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;
