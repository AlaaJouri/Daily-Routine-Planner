import "./../UserData.css";
import useAuth from "../../hooks/useAuth";
import NutritionUpdate from "./NutritionUpdate";
import Footer from "./../Footer";
import * as React from "react";

export default function NutritionGet() {
    const {user} = useAuth(false);


    if (!user) return <p> </p>;
    return(
        <>
            <NutritionUpdate user={user}/>
            <Footer/>
        </>
    )
}