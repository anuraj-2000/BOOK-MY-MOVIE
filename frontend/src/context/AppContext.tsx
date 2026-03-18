import { useState, type ReactNode } from "react";
import { AppContext } from "./context";
import type { Show } from "../types";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [shows, setShows] = useState<Show[]>([]);

  return (
    <AppContext.Provider value={{ shows, setShows }}>
      {children}
    </AppContext.Provider>
  );
};