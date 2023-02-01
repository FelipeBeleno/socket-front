import { createContext, useCallback, useState } from "react";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";



export const AuthContext = createContext();


const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null
};



export const AuthProvider = ({ children }) => {



    const [auth, setAuth] = useState(initialState);


    const login = async (email, password) => {
        const resp = await fetchSinToken('login', { email, password }, 'POST')


        if (resp.ok) {
            localStorage.setItem('token', resp.token)
            let { id, name, email } = resp.usuario;


            setAuth({
                uid: id,
                email,
                name,
                checking: false,
                logged: true
            })
        }

        return resp.ok;

    }


    const register = async (name, email, password) => {


        const resp = await fetchSinToken('login/new', { email, password, name }, 'POST')


        if (resp.ok) {
            localStorage.setItem('token', resp.token)
            let { id, name, email } = resp.usuario;


            setAuth({
                uid: id,
                email,
                name,
                checking: false,
                logged: true
            })
        }

        return resp.ok;

    }

    const verificaToken = useCallback(async () => {


        const token = localStorage.getItem('token')

        // si no existe el token
        if (!token) {
             setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null
            })
            return false
        }


        const resp = await fetchConToken('login/renew')
        if (resp.ok) {
            localStorage.setItem('token', resp.token)
            let { id, name, email } = resp.usuario;


            setAuth({
                uid: id,
                email,
                name,
                checking: false,
                logged: true
            })
            return resp.ok;
        } else {
            setAuth({
                uid: null,
                email: null,
                name: null,
                checking: false,
                logged: false
            })
            return false
        }




    }, [],)

    const logout = () => {


        localStorage.removeItem('token')
        setAuth({
            checking: false,
            logged: false
        })

    }




    return (
        <AuthContext.Provider value={{
            auth,
            login,
            register,
            verificaToken,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}