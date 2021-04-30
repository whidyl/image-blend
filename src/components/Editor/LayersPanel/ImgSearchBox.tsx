import React, { useEffect } from "react";

interface Props {
  query: string;
  setQuery: (query: string) => void;
  refreshURL: () => void;
}

const ImgSearchBox: React.FC<Props> = ({ query, setQuery, refreshURL }) => {
  useEffect(() => {
      const timeoutID = setTimeout(refreshURL, 1000)
      return () => {
          clearTimeout(timeoutID);
      }
  }, [query])


  return (
    <span className="mb-1 mt-2 flex items-center">
      <label className="ml-1 mr-7 text-white text-sm font-medium">
        Search:
      </label>
      <input
        type="text"
        placeholder="Image search query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className=" mr-2 px-1 pl-2 py-2 basic-clickable rounded-md bg-muidark-2 shadow-inner flex-grow placeholder-white placeholder-opacity-30"
      />
      <button>
          refresh
      </button>
    </span>
  );
};

export default ImgSearchBox;
