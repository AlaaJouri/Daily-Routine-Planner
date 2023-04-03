import axios from "axios";
import {FormEvent, useState} from "react";
import {User} from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type Props = { user: User }

export default function AktivitaetenUpdate(props: Props) {

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
    const [steps, setSteps] = useState(props.user.steps);
    const [burnedCalories, setBurnedCalories] = useState(props.user.burnedCalories);
    const [trainingTimes, setTrainingTimes] = useState(props.user.trainingTimes);

    const updateAktivity = async (updatedUserData: any) => {
        axios
            .put("/api/user/" + props.user.id, updatedUserData)
            .then(() => {
                navigate("/activity");
            })
            .catch((err) => {
                alert(err.response.data.error);
            });
    }
    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const updatedUserDataAktivity = {
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
                trainingTimes


            };
            await updateAktivity(updatedUserDataAktivity);
            // show success message or navigate to a different page
        } catch (error) {
            console.error('Failed to update user data', error);
            // show error message to the user
        }
    };
    return (
        <div className="Profile">
            <div>
                <h1 id="title" className="title">Aktivitäten</h1>
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
                    <TextField id="outlined-basic" label="Schritten" variant="outlined" value={steps}
                               onChange={(e) => setSteps(parseInt(e.target.value))}/>

                    <TextField id="outlined-basic" label="vebrannten Kaloriern" variant="outlined"
                               value={burnedCalories} onChange={(e) => setBurnedCalories(parseInt(e.target.value))}/>

                    <TextField id="outlined-basic" label="Trainingszeiten" variant="outlined" value={trainingTimes}
                               onChange={(e) => setTrainingTimes(parseInt(e.target.value))}/>

                </Box>

                <button className="item8"> Speichern</button>

            </form>
        </div>
    );
}
