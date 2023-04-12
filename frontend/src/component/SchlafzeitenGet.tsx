import "./UserData.css";
import useAuth from "../hooks/useAuth";
import Schlafzeitenupdate from "./Schlafzeitenupdate";

export default function ProfileUserData() {
    const {user} = useAuth(false);


    if (!user) return <p> User not fund</p>;
    return (
        <>
            <Schlafzeitenupdate user={user}/>
        </>
    )
}