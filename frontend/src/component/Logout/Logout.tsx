import useAuth from "../../hooks/useAuth";
import axios from "axios";
import {useLocation} from "react-router-dom";
import * as React from "react";

export default function Logout () {
    const user = useAuth(false);
    const location = useLocation();

    return user && (
        <div className="Profile">
            <h1 id="title" className="title">LOG OUT</h1>
            <p id="description" className="title"> Do you want to log out of your account?</p>
            <hr/>
        <button className={"Layout"} onClick={() => {
            axios.post("/api/user/logout").then(() => {
                window.sessionStorage.setItem(
                    "signInRedirect",
                    location.pathname || "/"
                );
              window.location.href = "/Sign-up";
            });
        }}>Logout </button>
            </div>
            )}