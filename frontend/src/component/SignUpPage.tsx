import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import AuthForm from "../component/AuthForm";

export default function SignUpPage() {
    const navigate = useNavigate();

    const handleSignUp = (username: string, password: string) => {
        axios
            .post("/api/user", {username, password})
            .then(() => {
                navigate("/login");
            })
            .catch((err) => {
                alert(err.response.data.error);
            });
    };

    return (

        <AuthForm
            title="Sign Up"
            buttonText="Sign Up"
            onSubmit={handleSignUp}/>

    );
}