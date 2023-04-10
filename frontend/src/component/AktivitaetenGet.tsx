import "./UserData.css";
import useAuth from "../hooks/useAuth";
import AktivitaetenUpdate from "./AktivitaetenUpdate";

export default function AktivitaetenGet() {
    const {user} = useAuth(false);


    if (!user) return <p> User not fund</p>;
    return (
        <>
            <AktivitaetenUpdate user={user}/>
        </>
    )
}