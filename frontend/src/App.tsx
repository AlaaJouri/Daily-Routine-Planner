import React, {useState} from 'react';
import {UserData} from "./model/UserData";

import axios from "axios";
import ProfileUserData from "./component/ProfileUserData";


function App() {
    const [userData, setUserData] = useState<UserData[]>([])

    function addUserData(userDataToAdd: UserData) {

        axios.post("/api/userdata/", userDataToAdd)
            .then((response) => {
                setUserData([...userData, response.data])
            })
            .catch((error) => {
                console.error("I'm sorry. Something went wrong!" + error)
            });
    }

    function deleteUserData(id: string) {
        axios.delete("/api/userdata/" + id)
            .catch(console.error);
    }

    return (
        <div className="App">
            <ProfileUserData addUserData={addUserData}/>
        </div>
    );
}

export default App;
