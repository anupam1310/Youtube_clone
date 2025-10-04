import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();
// Context to manage sidebar open/close state across the application
export function SidebarProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
