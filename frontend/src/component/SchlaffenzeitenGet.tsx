import "./UserData.css";
import useAuth from "../hooks/useAuth";
import Schlaffenzeitenupdate from "./Schlaffenzeitenupdate";

export default function ProfileUserData() {
    const {user} = useAuth(false);


    if (!user) return <p> User not fund</p>;
    return(
        <>
            <Schlaffenzeitenupdate user={user}/>
        </>
    )
}