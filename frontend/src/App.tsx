import React, {useState} from 'react';
import {UserData} from "./model/UserData";

import axios from "axios";
import AddUserData from "./component/AddUserData";


function App() {
    const [userData, setUserData] = useState<UserData[]>([])
  function addUserData(userDataToAdd: UserData) {

    axios.post("/api/userdata", userDataToAdd)
        .then((response) => {
            setUserData([...userData, response.data])
        })
        .catch((error) => {
          console.error("I'm sorry. Something went wrong!" + error)
        });
  }

  return (
    <div className="App">
<header> Hallllo</header>


            <AddUserData addUserData={addUserData}/>

    </div>
  );
}

export default App;
