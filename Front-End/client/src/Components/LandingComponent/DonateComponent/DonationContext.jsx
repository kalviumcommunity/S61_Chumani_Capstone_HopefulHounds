import React, { createContext, useContext, useState} from "react";
const DonationContext = createContext();
export const useDonation = () => {
    return useContext(DonationContext);
}
export const DonationProvider = ({children}) => {
    const [totalDonation, setTotalDonation] = useState(0);
    const addDonation = (amount) => {
        setTotalDonation(prevTotal => prevTotal + amount);
    };
    return(
        <DonationContext.Provider value={{totalDonation, addDonation}}>
            {children}
        </DonationContext.Provider>
    )
}