import { createContext } from "react";
import type { Show } from "../types";

interface AppContextType {
  shows: Show[];
  setShows: React.Dispatch<React.SetStateAction<Show[]>>;
}

export const AppContext = createContext<AppContextType | null>(null);