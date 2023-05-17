import { createContext, useEffect }  from "react";


export const UserContext = createContext()

const UserProvider = ({ children }) => {

    const INITIAL_STATE = {
        userDetails: JSON.parse(localStorage.getItem('userDetails')) || null,
    }

    return (
        <UserContext.Provider value={{ userDetails: INITIAL_STATE.userDetails}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider