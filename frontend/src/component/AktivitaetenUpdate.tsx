import axios from "axios";
import {FormEvent, useState} from "react";
import {User} from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type PropsAktivitaeten = { user: User }

export default function AktivitaetenUpdate(props: PropsAktivitaeten) {

    const navigate2 = useNavigate();
    const gender = props.user.gender;
    const weight = props.user.weight;
    const weightGoal = props.user.weightGoal;
    const sleepTimeTarget = props.user.sleepTimeTarget;
    const trainingTimeGoal = props.user.trainingTimeGoal;
    const stepTarget = props.user.stepTarget;
    const caloriesBurnedTarget = props.user.caloriesBurnedTarget;
    const username = props.user.username;
    const password = props.user.password;
    const name = props.user.name;
    const breakfast = props.user.breakfast;
    const lunch = props.user.lunch;
    const dinner = props.user.dinner;
    const snacks = props.user.snacks;
    const id = props.user.id;

    const standup = props.user.standup;
    const sleep = props.user.sleep;
    const water = props.user.water;
    const [steps, setSteps] = useState(props.user.steps);
    const [burnedCalories, setBurnedCalories] = useState(props.user.burnedCalories);
    const [trainingTimes, setTrainingTimes] = useState(props.user.trainingTimes);

    const updateAktivity = async (updatedUserData: any) => {
        axios
            .put("/api/user/" + props.user.id, updatedUserData)
            .then(() => {
                navigate2("/activity");
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
                trainingTimes,
                breakfast,
                lunch,
                dinner,
                snacks,
                standup,
                sleep,
                water

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
            <form onSubmit={handleSave}>

                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 1, width: '25ch'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Schritten" variant="outlined" value={steps}
                               onChange={(e) => setSteps(parseInt(e.target.value))}
                               sx={{
                                   '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                       borderColor: 'black', // Farbe des Rahmens ändern, wenn das Textfeld im Fokus ist
                                   },
                                   '& .MuiInputLabel-outlined.Mui-focused': {
                                       color: 'black', // Farbe des Labels ändern, wenn das Textfeld im Fokus ist
                                   },
                               }}/>

                    <TextField id="outlined-basic" label="vebrannten Kaloriern" variant="outlined"
                               value={burnedCalories} onChange={(e) => setBurnedCalories(parseInt(e.target.value))}
                               sx={{
                                   '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                       borderColor: 'black', // Farbe des Rahmens ändern, wenn das Textfeld im Fokus ist
                                   },
                                   '& .MuiInputLabel-outlined.Mui-focused': {
                                       color: 'black', // Farbe des Labels ändern, wenn das Textfeld im Fokus ist
                                   },
                               }}/>

                    <TextField id="outlined-basic" label="Trainingszeiten" variant="outlined" value={trainingTimes}
                               onChange={(e) => setTrainingTimes(parseInt(e.target.value))} sx={{
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black', // Farbe des Rahmens ändern, wenn das Textfeld im Fokus ist
                        },
                        '& .MuiInputLabel-outlined.Mui-focused': {
                            color: 'black', // Farbe des Labels ändern, wenn das Textfeld im Fokus ist
                        },
                    }}/>

                </Box>

                <button className="item8"> Speichern</button>

            </form>
        </div>
    );
}
