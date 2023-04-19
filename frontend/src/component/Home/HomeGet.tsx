import "./../UserData.css";
import useAuth from "../../hooks/useAuth";
import Home from "./Home";
import Footer from "./../Footer";
import * as React from "react";

export default function HomeGet() {
    const {user} = useAuth(false);


    if (!user) return <p> </p>;
    return (
        <>
            <Home user={user}/>
            <Footer/>
        </>
    )
}