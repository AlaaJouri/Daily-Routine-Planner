import "./../UserData.css";
import useAuth from "../../hooks/useAuth";
import Water from "./Water";

export default function WaterGet() {
    const {user} = useAuth(false);


    if (!user) return <p> User not fund</p>;
    return (
        <>
            <Water user={user}/>
        </>
    )
}