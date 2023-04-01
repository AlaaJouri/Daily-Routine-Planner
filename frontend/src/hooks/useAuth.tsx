import axios from "axios";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export type User = {
    id: string;
    username: string;
    password:string;
    role: string;
    name:string,
    gender:string,
    weight:string,
    weightGoal:number,
    sleepTimeTarget:number,
    trainingTimeGoal:number,
    stepTarget:number,
    caloriesBurnedTarget:number,
    steps:number,
    burnedCalories:number,
    trainingTimes:number



}

export default function useAuth(redirectToSignIn?: boolean) {


    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const {pathname} = useLocation();

    useEffect(() => {
        axios.get("/api/user/me").then(res => {
            setUser(res.data);
        }).catch(e => {
            if (redirectToSignIn && e.response.status === 401) {
                window.sessionStorage.setItem("signInRedirect", pathname || "/");
                navigate("/sign-in");
            }
        });
    }, [pathname, navigate, redirectToSignIn]);
    return {user, username, password, setUsername, setPassword};
}