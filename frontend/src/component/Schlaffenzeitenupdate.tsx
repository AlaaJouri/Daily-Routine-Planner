import axios from "axios";
import {FormEvent, useState} from "react";
import {User} from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as React from "react";

type Props = { user: User }


export default function ProfileUserDataLoaded(props: Props) {
    const navigate = useNavigate();
    const gender = props.user.gender;
    const weight = props.user.weight;
    const weightGoal = props.user.weightGoal;
    const sleepTimeTarget = props.user.sleepTimeTarget;
    const trainingTimeGoal = props.user.trainingTimeGoal;
    const stepTarget = props.user.stepTarget;
    const caloriesBurnedTarget = props.user.caloriesBurnedTarget;
    const id = props.user.id;
    const username = props.user.username;
    const password = props.user.password;
    const name = props.user.name;
    const steps = props.user.steps;
    const burnedCalories = props.user.burnedCalories;
    const trainingTimes = props.user.trainingTimes;
    const breakfast= useState(props.user.breakfast);
    const lunch= props.user.lunch;
    const dinner= props.user.dinner;
    const snacks= props.user.snacks;
    const [standup, setStandup] = useState(props.user.standup);
    const [sleep, setSleep] = useState(props.user.sleep);

    const updateUser = async (updatedUserData: any) => {
        axios
            .put("/api/user/" + props.user.id, updatedUserData)
            .then(() => {
                navigate("/profile");
            })
            .catch((err) => {
                alert(err.response.data.error);
            });
    }
    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const updatedUserData = {
                id,
                username,
                password,
                name,
                gender,
                weight,
                weightGoal,
                sleepTimeTarget,
                trainingTimeGoal,
                stepTarget,
                caloriesBurnedTarget,
                steps,
                burnedCalories,
                trainingTimes,
                standup,
                sleep

            };
            await updateUser(updatedUserData);
            // show success message or navigate to a different page
        } catch (error) {
            console.error('Failed to update user data', error);
            // show error message to the user
        }
    };
    return (
        <div className="Profile">
            <div>
                <h1 id="title" className="title">Profile</h1>
                <p id="description" className="title">Planen Sie Ihren Tag</p>
                <hr/>
            </div>

            <form id="survey-form" className="container" onSubmit={handleSave}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 1, width: '25ch'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Schritten" variant="outlined" value={standup}
                               onChange={(e) => setStandup(new Date(Date.parse(e.target.value)))}/>

                    <TextField id="outlined-basic" label="Geschlecht" variant="outlined" value={sleep}
                               onChange={(e) => setSleep(new Date(Date.parse(e.target.value)))}/>
                </Box>
                <br/>

                <button className="item8"> Speichern</button>

            </form>
        </div>
    );
}
