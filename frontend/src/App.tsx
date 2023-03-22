import React, {useState} from 'react';
import {UserData} from "./model/UserData";
import {Route, Routes} from "react-router-dom";
import axios from "axios";
import ProfileUserData from "./component/ProfileUserData";
import SignUpPage from "./component/SignUpPage";
import Cookies from "js-cookie";
import SignInPage from "./component/SignInPage";
import Logout from "./component/Logout";

axios.interceptors.request.use(function (config) {
    return fetch("/api/csrf").then(() => {
        config.headers["X-XSRF-TOKEN"] = Cookies.get("XSRF-TOKEN");
        return config;
    });
}, function (error) {
    return Promise.reject(error);
});
function App() {
    const [userData, setUserData] = useState<UserData[]>([])

/*
    function fetchWUserData() {
        axios.get("/api/userdata/")
            .then(response => {
                setUserData(response.data);
            })
            .catch(console.error);
    }*/

    function addUserData(userDataToAdd: UserData) {

        axios.post("/api/userdata/", userDataToAdd)
            .then((response) => {
                setUserData([...userData, response.data])
            })
            .catch((error) => {
                console.error("I'm sorry. Something went wrong!" + error)
            });
    }

    return (
        <div className="App">
            <Routes>


                <Route path={"/sign-up"} element={<SignUpPage/>}/>
                <Route path={"/"} element={ <ProfileUserData addUserData={addUserData}/>}/>
                 <Route path={"/logout"} element={<Logout/>}/>
            </Routes>

        </div>
    );
}

export default App;
