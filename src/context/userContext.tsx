import { useEffect, useState, createContext, useContext } from "react";
import { UserType } from "../types/enums/userType";
import {  isJwtTokenExpired } from "../utils/token";
import { refreshSession } from "../services/userService";
import { useNavigate } from "react-router-dom";


interface UserContextType {
    user: { userName: string, email: string, roles: string[], company: any };
    selectedRole: UserType | null | undefined | "logout";
    changeRole: (role: UserType) => void;
    setLogInUser: any;
}


export const UserContext = createContext<UserContextType>(null!)
export const UserProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState<UserType | null | "logout">();

    useEffect(() => {
        const userDataJson = localStorage.getItem('user');
        if (userDataJson) {
            const authUser = JSON.parse(userDataJson);
            const accessToken = authUser.accessToken;
            if (!accessToken)
                return;
            if (isJwtTokenExpired(accessToken)) {
                // refresh token 
                refreshSession(authUser.refreshToken).then((response)=>{
                    if(response.status){
                        setLogInUser(response.data);
                    }else {
                        // remove sessionfrom localstorage
                        localStorage.removeItem("user");
                        navigate('/login')
                    }
                })
            } else {
                setSelectedRole(authUser.selectedRole);
                setUser(authUser)
            }
        }
    }, []);

    // useEffect(() => {
    //     if (user) {
    //         selectedRole && localStorage.setItem('user', JSON.stringify({ ...user, selectedRole }));
    //         !selectedRole && setSelectedRole(user.roles[0]);
    //     }
    // }, [user, selectedRole]);

    const changeRole = (role: UserType) => {
        setSelectedRole(role);
    }

    const setLogInUser = (data: any) => {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
    }

    const value: UserContextType = {
        // roles,
        user,
        selectedRole,
        changeRole,
        setLogInUser
    }

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
};


export const useUserContext: () => UserContextType = () => useContext(UserContext);
