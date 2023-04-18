import "./../UserData.css";
import useAuth from "../../hooks/useAuth";
import NutritionUpdate from "./NutritionUpdate";

export default function NutritionGet() {
    const {user} = useAuth(false);


    if (!user) return <p> </p>;
    return(
        <>
            <NutritionUpdate user={user}/>
        </>
    )
}