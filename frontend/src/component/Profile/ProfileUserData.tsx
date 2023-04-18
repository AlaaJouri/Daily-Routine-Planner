import "./../UserData.css";
import useAuth from "../../hooks/useAuth";
import ProfileUserDataLoaded from "./ProfileUserDataLoaded";

export default function ProfileUserData() {
    const {user} = useAuth(false);


    if (!user) return <p> </p>;
return(
    <>
        <ProfileUserDataLoaded user={user}/>
    </>
)
}