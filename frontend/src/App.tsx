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
import UpdateBook from "./component/UpdateBuch";
import {Book} from "./model/Book";
import DrinkWater from './component/WasserGet';
import Home from './component/HomeGet';
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
    const [buch, setBuch] = useState<Book[]>([])

    function fetchBuecher() {
        axios.get("/api/book")
            .then(response => {
                setBuch(response.data);
            })
            .catch(console.error);
    }

    function updateBuch(buch: Book) {
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
                <Route path={"/book/update/:id"} element={<UpdateBook buch={buch} updateBuch={updateBuch} />}/>
                <Route path={"/water"} element={<DrinkWater />}/>
                <Route path={"/home"} element={<Home/>}/>
            </Routes>
        </div>
            </>
    );
}

export default App;
