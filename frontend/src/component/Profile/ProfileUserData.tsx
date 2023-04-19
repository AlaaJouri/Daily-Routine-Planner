import "./../UserData.css";
import useAuth from "../../hooks/useAuth";
import ProfileUserDataLoaded from "./ProfileUserDataLoaded";
import Footer from "./../Footer";
import * as React from "react";

export default function ProfileUserData() {
    const {user} = useAuth(false);


    if (!user) return <p></p>;
    return (
        <>
            <ProfileUserDataLoaded user={user}/>
            <Footer/>
        </>
    )
}