import "./UserData.css";
import useAuth from "../hooks/useAuth";
import NutritionUpdate from "./NutritionUpdate";

export default function ErnaehrungGet() {
    const {user} = useAuth(false);


    if (!user) return <p> User not fund</p>;
    return(
        <>
            <NutritionUpdate user={user}/>
        </>
    )
}