import { createContext, useContext, useState } from "react";

const SearchWordContext = createContext();
// Context to manage the search word state across the application
export function SearchWordProvider({ children }) {
  const [searchWord, setSearchWord] = useState("");

  return (
    <SearchWordContext.Provider value={{ searchWord, setSearchWord }}>
      {children}
    </SearchWordContext.Provider>
  );
}

export function useSearchWord() {
  return useContext(SearchWordContext);
}
