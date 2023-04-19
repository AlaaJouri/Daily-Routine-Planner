import "./../UserData.css";
import useAuth from "../../hooks/useAuth";
import SleepTimesUpdate from "./SleepTimesUpdate";
import Footer from "./../Footer";
import * as React from "react";

export default function SleepTimesGet() {
    const {user} = useAuth(false);


    if (!user) return <p></p>;
    return (
        <>
            <SleepTimesUpdate user={user}/>
            <Footer/>
        </>
    )
}