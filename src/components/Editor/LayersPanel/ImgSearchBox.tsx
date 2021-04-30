import React, { useEffect, useState } from "react";

interface Props {
  query: string;
  setQuery: (query: string) => void;
  refreshURL: () => void;
}

const ImgSearchBox: React.FC<Props> = ({ query, setQuery, refreshURL }) => {
  const [disableRefresh, setDisableRefresh] = useState(false);

  useEffect(() => {
    const timeoutID = setTimeout(refreshURL, 1000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [query]);

  const onRefreshClick = () => {
    setDisableRefresh(true);
    setTimeout(() => setDisableRefresh(false), 2000);
    refreshURL();
  };

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
        className=" mr-2 px-1 pl-2 py-2 w-9 basic-clickable rounded-md bg-muidark-2 shadow-inner flex-grow placeholder-white placeholder-opacity-30"
      />
      <button
        className={`mr-1 p-2 w-8 h-8 bg-muidark-2 basic-clickable disabled:opacity-50 ${ disableRefresh ? "cursor-default" : "" }`}
        disabled={disableRefresh}
        onClick={() => onRefreshClick()}
      >
        <img
          className={`opacity-50 ${ disableRefresh ? "" : "hover:opacity-100 cursor-pointer " } `}
          src="icons8-refresh-30.png"
          alt="expand layer"
        />
      </button>
    </span>
  );
};

export default ImgSearchBox;
