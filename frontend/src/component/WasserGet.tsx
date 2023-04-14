import "./UserData.css";
import useAuth from "../hooks/useAuth";
import Wasser from "./Wasser";

export default function WasserGet() {
    const {user} = useAuth(false);


    if (!user) return <p> User not fund</p>;
    return (
        <>
            <Wasser user={user}/>
        </>
    )
}