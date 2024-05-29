import React,{ useContext, useEffect, useState } from "react";
import {auth} from '../../firebase/firebase'
import { onAuthStateChanged } from "firebase/auth";

 const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null);
    const [userLogIn, setUserLogIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if(user){
                setCurrentUser(user);
                setUserLogIn(true);
            }else{
                setCurrentUser(null);
                setUserLogIn(false);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, [])
    const value = {
        currentUser, 
        userLogIn,
        loading,
        setUserLogIn,
    }
    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}