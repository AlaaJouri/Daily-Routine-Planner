import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import axios from "axios";
import ProfileUserData from "./component/ProfileUserData";
import SignUpPage from "./component/SignUpPage";
import Cookies from "js-cookie";
import Login from "./component/Login";
import Logout from "./component/Logout";
import ResponsiveAppBar from "./component/ResponsiveAppBar";
import Activity from "./component/AktivitaetenGet";
import Nutrition from "./component/ErnaehrungGet";
import Sleeptimes from "./component/SchlafzeitenGet";
import Lessen from "./component/LessenGet";
import Book from "./component/UpdateBuch";
import {Buch} from "./model/Buch";
import DrinkWater from './component/Wasser';
import useAuth, {User} from "./hooks/useAuth";

axios.interceptors.request.use(function (config) {
    return fetch("/api/csrf").then(() => {
        config.headers["X-XSRF-TOKEN"] = Cookies.get("XSRF-TOKEN");
        return config;
    });
}, function (error) {
    return Promise.reject(error);
});

function App() {
    const [buch, setBuch] = useState<Buch[]>([])

    function fetchBuecher() {
        axios.get("/api/book")
            .then(response => {
                setBuch(response.data);
            })
            .catch(console.error);
    }

    function updateBuch(buch: Buch) {
        axios.put("/api/book/" + buch.id, buch)
            .then(fetchBuecher)
            .catch(console.error);
    }
    const user = useAuth(true);
    if (!user) return <p> User not fund</p>;
    return (
        <>
        <div className="App">
            <ResponsiveAppBar/>
            <Routes>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/sign-up"} element={<SignUpPage/>}/>
                <Route path={"/profile"} element={<ProfileUserData/>}/>
                <Route path={"/logout"} element={<Logout/>}/>
                <Route path={"/activity"} element={<Activity/>}/>
                <Route path={"/nutrition"} element={<Nutrition/>}/>
                <Route path={"/sleep-times"} element={<Sleeptimes/>}/>
                <Route path={"/lessen"} element={<Lessen/>}/>
                <Route path={"/book/update/:id"} element={<Book buch={buch}  updateBuch={updateBuch} />}/>
                <Route path={"/home"} element={<DrinkWater/>}/>
            </Routes>
        </div>
            </>
    );
}

export default App;
