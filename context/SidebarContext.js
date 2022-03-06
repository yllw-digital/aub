import { createContext, useState, useContext } from "react";

export const SidebarContext = createContext();

export const SidebarContextProvider = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState(true);

    const handleShowSidebar = () => {
        setShowSidebar(true);
    }

    const handleHideSidebar = () => {
        setShowSidebar(false);
    }

    return <SidebarContext.Provider value={{
        showSidebar,
        sidebarShow: () => handleShowSidebar(),
        sidebarHide: () => handleHideSidebar()
    }} >
        {children}
    </SidebarContext.Provider>
}