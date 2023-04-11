import axios from "axios";
import {FormEvent, useState} from "react";
import {User} from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {createTheme,ThemeProvider} from "@mui/material";


type Props = { user: User }

const theme = createTheme({
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: 'black',
                    },
                },
            },
        },
    },
});


export default function ErnaehrungUpdate(props: Props) {

    const navigate1 = useNavigate();
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
    const [breakfast, setBreakfast] = useState(props.user.breakfast);
    const [lunch, setLunch] = useState(props.user.lunch);
    const [dinner, setDinner] = useState(props.user.dinner);
    const [snacks, setSnacks] = useState(props.user.snacks);

    const updateNutrition = async (updatedUserData: any) => {
        axios
            .put("/api/user/" + props.user.id, updatedUserData)
            .then(() => {
                navigate1("/nutrition");
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
        <ThemeProvider theme={theme}>
        <div className="Profile">
            <div>
                <h1 id="title" className="title">Ernährung</h1>
                <hr/>
            </div>
            <br/>
            <br/>
            <form onSubmit={handleSave}>
                <Box sx={{minWidth: 120}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Fruhstück</InputLabel>
                        <Select

                            sx={{

                                color: "black", // ändert die Schriftfarbe
                                display: 'flex',
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'black'
                                }
                            }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={breakfast}
                            label="breakfast"
                            onChange={(e) => setBreakfast(e.target.value)}
                            variant="outlined"
                        >
                            <MenuItem value={10}>Gesund</MenuItem>
                            <MenuItem value={20}>Ungesund</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                    <br/>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Mittagessen</InputLabel>
                        <Select
                            sx={{
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'black',
                                },
                                '&.Mui-focused .MuiSelect-icon': {
                                    color: 'black',
                                },
                                '&.MuiInput-underline:after': {
                                    borderBottomColor: 'black',
                                },
                                '&.MuiInputBase-root': {
                                    color: 'black',
                                },
                            }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={lunch}
                            label="lunch"
                            onChange={(e) => setLunch(e.target.value)}
                            variant="outlined"
                        >
                            <MenuItem value={10}>Gesund</MenuItem>
                            <MenuItem value={20}>Ungesund</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                    <br/>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Abendessen</InputLabel>
                        <Select
                            sx={{
                                color: "black", // ändert die Schriftfarbe
                                display: 'flex',
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'black'
                                }
                            }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={dinner}
                            label="Dinner"
                            onChange={(e) => setDinner(e.target.value)}
                            variant="outlined"
                        >
                            <MenuItem value={10}>Gesund</MenuItem>
                            <MenuItem value={20}>Ungesund</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                    <br/>
                    <FormControl fullWidth sx={{color: 'black'}}>
                        <InputLabel id="demo-simple-select-label">Snachs</InputLabel>
                        <Select
                            sx={{
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'black',
                                    color: 'black', // ändert die Schriftfarbe
                                    broder: '1px solid red',

                                }
                            }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={snacks}
                            label="Snachs"
                            onChange={(e) => setSnacks(e.target.value)}
                            variant="outlined"
                        >
                            <MenuItem value={10}>Gesund</MenuItem>
                            <MenuItem value={20}>Ungesund</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                    <br/>
                    <br/>
                    <button className="item8"> Speichern</button>
                </Box>
            </form>
        </div>
        </ThemeProvider>
    );
}
