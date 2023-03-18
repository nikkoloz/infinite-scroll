import { createContext, useState, ReactNode } from "react";
import type { VisitedT, AppContextT } from "../types/types";

type AppContextProviderT = {
  children: ReactNode;
};

const AppContext = createContext<AppContextT>({
  visited: [],
  setVisited: () => {},
});

const AppContextProvider: React.FC<AppContextProviderT> = ({ children }) => {
  const [visited, setVisited] = useState<VisitedT[]>([]);

  return (
    <AppContext.Provider value={{ visited, setVisited }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext };
