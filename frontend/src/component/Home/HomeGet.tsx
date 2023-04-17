import "./UserData.css";
import useAuth from "../../hooks/useAuth";
import Home from "./Home";

export default function HomeGet() {
    const {user} = useAuth(false);


    if (!user) return <p> User not fund</p>;
    return (
        <>
            <Home user={user}/>
        </>
    )
}