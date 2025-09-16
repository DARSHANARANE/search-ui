import React, { useState, useEffect } from "react";
import data from "./data.json";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (!query) {
      setFiltered([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const handler = setTimeout(() => {
      setFiltered(
        data.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      );
      setLoading(false);
    }, 800);
    return () => clearTimeout(handler);
  }, [query]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-10 justify-center">
      <div  className="bg-white rounded-2xl shadow-lg w-full max-w-lg">
        <SearchBar query={query} setQuery={setQuery} loading={loading} />
        <SearchResults results={filtered} query={query} loading={loading} />
      </div>
    </div>
  );
}

export default App;
