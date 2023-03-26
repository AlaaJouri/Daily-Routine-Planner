import React, {FormEvent, useState} from "react";
import "./Login.css"

type AuthFormProps = {
    title: string;
    buttonText: string;
    onSubmit: (username: string, password: string) => void;
}


export default function AuthForm({title, buttonText, onSubmit}: AuthFormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(username, password);
    };

    return (
        <div className="login-box">
            <h1>{title}</h1>

            <form onSubmit={handleSubmit}>
                <div className="user-box">
                    <label>
                        Username
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.currentTarget.value)}
                        />
                    </label>
                </div>

                <div className="user-box">
                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                    </label>
                </div>

                <button type="submit">{buttonText}</button>
            </form>
        </div>
    );
}