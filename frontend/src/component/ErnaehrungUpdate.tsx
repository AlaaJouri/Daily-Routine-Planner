import axios from "axios";
import {FormEvent, useState} from "react";
import {User} from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

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
    const steps= props.user.steps;
    const burnedCalories= props.user.burnedCalories;
    const trainingTimes=props.user.trainingTimes;
    const [breakfast, setBreakfast] = useState(props.user.Breakfast);
    const [lunch, setTrainingTimes] = useState(props.user.Lunch);
    const [dinner, setLunch] = useState(props.user.Dinner);
    const [snacks, setSnacks] = useState(props.user.snacks);

    const updateNutrition = async (updatedUserData: any) => {
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
                trainingTimes,
                breakfast,
                lunch,
                dinner,
                snacks



            };
            await updateNutrition(updatedUserDataAktivity);
            // show success message or navigate to a different page
        } catch (error) {
            console.error('Failed to update user data', error);
            // show error message to the user
        }
    };
    return (
        <div >
            <div>
                <h1 id="title">Ernährung</h1>
                <hr/>
            </div>
            <form id="survey-form" className="container" >
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth

                                onChange={(e) => setBreakfast(e.target.value)}>
                        <InputLabel color={"info"}   variant="standard" htmlFor="breakfast">
                            Frühstück
                        </InputLabel>
                        <NativeSelect
                            defaultValue={20}
                            inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                            }}
                        >
                            <option value={10}>Gesund</option>
                            <option value={20}>Ungesund</option>
                        </NativeSelect>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="lunch">
                            Mittagessen
                        </InputLabel>
                        <NativeSelect
                            defaultValue={20}
                            inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                            }}
                        >
                            <option value={10}>Gesund</option>
                            <option value={20}>Ungesund</option>
                        </NativeSelect>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="dinner">
                            Abendessen
                        </InputLabel>
                        <NativeSelect
                            defaultValue={20}
                            inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                            }}
                        >
                            <option value={10}>Gesund</option>
                            <option value={20}>Ungesund</option>
                        </NativeSelect>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel variant="outlined" htmlFor="snacks">
                            snacks
                        </InputLabel>
                        <NativeSelect
                            defaultValue={20}
                            inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                            }}
                        >
                            <option value={10}>Gesund</option>
                            <option value={20}>Ungesund</option>
                        </NativeSelect>
                    </FormControl>
                </Box>
                <button className="item8"> Speichern</button>
            </form>
        </div>
    );
}
