import "./UserData.css";
import useAuth from "../hooks/useAuth";
import ErnaehrungUpdate from "./ErnaehrungUpdate";

export default function ErnaehrungGet() {
    const {user} = useAuth(false);


    if (!user) return <p> User not fund</p>;
    return(
        <>
            <ErnaehrungUpdate user={user}/>
        </>
    )
}