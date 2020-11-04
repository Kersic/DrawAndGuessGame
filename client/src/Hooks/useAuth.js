import {useContext} from "react";
import {LoaderContext} from "../Contexts/LoaderPrivider";
import {httpPost} from "../Services/Fetcher";
import {serverURL} from "../config";
import { useHistory } from "react-router-dom";
import {AlertContext} from "../Contexts/AlertProvider";

function useAuth() {
    const { setIsLoading } = useContext(LoaderContext);
    const { setAlert } = useContext(AlertContext);
    let history = useHistory();

    const login = (email, password) => {
        httpPost(
            serverURL + "user/login",
            null,
            {
                email,
                password
            },
            setIsLoading,
            (data) => {
                console.log(data);
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('username', data.user?.username);
                history.push('/')
            },
            (err) => {
                setAlert(err);
            }
        )
    }

    const register = (email, username, password) => {
        httpPost(
            serverURL + "user/register",
            null,
            {
                email,
                username,
                password
            },
            setIsLoading,
            (data) => {
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('username', data.user?.username);
                history.push('/');
            },
            (err) => {
                setAlert(err);
            }
        )
    }

    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        history.push('/login');
    }

    const getToken = () => {
        return sessionStorage.getItem('token');
    }

    const getUsername = () => {
        return sessionStorage.getItem('username');
    }

    const isLoggedIn = !!sessionStorage.getItem('token');

    return {login, register, logout, getToken, getUsername, isLoggedIn};
}
export default useAuth;