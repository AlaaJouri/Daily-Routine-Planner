import "./UserData.css";
import useAuth from "../hooks/useAuth";
import Schlafenzeitenupdate from "./Schlafenzeitenupdate";

export default function ProfileUserData() {
    const {user} = useAuth(false);


    if (!user) return <p> User not fund</p>;
    return (
        <>
            <Schlafenzeitenupdate user={user}/>
        </>
    )
}