import React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import AuthForm from "../component/AuthForm";




export default function Login() {
    const navigate = useNavigate();

    const handleSignIn = (username: string, password: string) => {
        const btoaString = `${username}:${password}`
        axios
            .post(
                "/api/user/login",
                {},
                {
                    headers: {Authorization: `Basic ${window.btoa(btoaString)}`}
                })
            .then(() => {
                const redirect =
                    window.sessionStorage.getItem("signInRedirect") || "/";
                window.sessionStorage.removeItem("signInRedirect");
                navigate(redirect);

            })
            .catch((err) => {
                alert(err.response.data.error);
            });
    };

    return (

        <AuthForm
            title="Sign In"
            buttonText="Sign In"
            onSubmit={handleSignIn}/>

    );
}