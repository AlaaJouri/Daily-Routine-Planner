import "./../UserData.css";
import useAuth from "../../hooks/useAuth";
import ActivityUpdate from "./ActivityUpdate";
import * as React from "react";
import Footer from "./../Footer";

export default function ActivityGet() {
    const {user} = useAuth(false);


    if (!user) return <p> </p>;
    return (
        <>
            <ActivityUpdate user={user}/>
            <Footer/>
        </>
    )
}