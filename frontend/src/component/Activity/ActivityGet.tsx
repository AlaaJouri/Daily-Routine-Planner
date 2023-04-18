import "./../UserData.css";
import useAuth from "../../hooks/useAuth";
import ActivityUpdate from "./ActivityUpdate";

export default function ActivityGet() {
    const {user} = useAuth(false);


    if (!user) return <p> </p>;
    return (
        <>
            <ActivityUpdate user={user}/>
        </>
    )
}