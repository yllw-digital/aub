import { faSleigh } from "@fortawesome/free-solid-svg-icons";
import { createContext, useState } from "react";

export const PopupsContext = createContext();

export const PopupsContextProvider = ({ children }) => {
    const [showPopups, setShowPopups] = useState({
        login: false,
        register: false,
        welcome: false,
        submitSurvey: false,
        surveyMessage: false,
        submitSuccess: false,
        submitError: false,
        forgotPassword:false
    });

    const handleShowPopup = (popup) => {
        let popupCopy = { ...showPopups };
        Object.keys(popupCopy).map((pup) => {
            popupCopy[pup] = false;
        })
        popupCopy[popup] = true;
        setShowPopups(popupCopy)
    }

    const handleClosePopup = (popup) => {
        let popupCopy = { ...showPopups };
        Object.keys(popupCopy).map((pup) => {
            popupCopy[pup] = false;
        })
        setShowPopups(popupCopy)
    }

    return <PopupsContext.Provider value={{
        showPopups,
        showPopup: (popup) => handleShowPopup(popup),
        closePopup: () => handleClosePopup()
    }} >
        {children}
    </PopupsContext.Provider>
};

