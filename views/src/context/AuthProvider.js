import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [imgUrl, setImgUrl] = useState();

    return (
        <AuthContext.Provider value={{ auth, setAuth, imgUrl ,setImgUrl }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;