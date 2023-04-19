import "./../UserData.css";
import useAuth from "../../hooks/useAuth";
import Water from "./Water";
import Footer from "./../Footer";
import * as React from "react";

export default function WaterGet() {
    const {user} = useAuth(false);


    if (!user) return <p></p>;
    return (
        <>
            <Water user={user}/>
            <Footer/>

        </>
    )
}