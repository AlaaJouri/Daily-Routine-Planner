import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import axios from "axios";
import ProfileUserData from "./component/Profile/ProfileUserData";
import SignUpPage from "./component/SignUpPage";
import Cookies from "js-cookie";
import Login from "./component/Login/Login";
import Logout from "./component/Logout/Logout";
import ResponsiveAppBar from "./component/ResponsiveAppBar";
import Activity from "./component/Activity/ActivityGet";
import Nutrition from "./component/Nutrition/NutritionGet";
import Sleeptimes from "./component/SleepTimes/SleepTimesGet";
import Lessen from "./component/Books/BooksGet";
import UpdateBook from "./component/Books/UpdateBook";
import {Book} from "./model/Book";
import DrinkWater from './component/Water/WaterGet';
import Home from './component/Home/HomeGet';
import useAuth from "./hooks/useAuth";

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
    if (!user) return <p></p>;
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
                    <Route path={"/book/update/:id"} element={<UpdateBook buch={buch} updateBuch={updateBuch}/>}/>
                    <Route path={"/water"} element={<DrinkWater/>}/>
                    <Route path={"/home"} element={<Home/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;
