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
    const [gender, setGender] = useState(props.user.gender);
    const [weight, setWeight] = useState(props.user.weight);
    const [weightGoal, setWeightGoal] = useState(props.user.weightGoal);
    const [sleepTimeTarget, setSleepTimeTarget] = useState(props.user.sleepTimeTarget);
    const [trainingTimeGoal, setTrainingTimeGoal] = useState(props.user.trainingTimeGoal);
    const [stepTarget, setStepTarget] = useState(props.user.stepTarget);
    const [caloriesBurnedTarget, setCaloriesBurnedTarget] = useState(props.user.caloriesBurnedTarget);
    const id = props.user.id;
    const username = props.user.username;
    const password = props.user.password;
    const [name, setName] = useState(props.user.name);
    const steps = props.user.steps;
    const water = props.user.water;
    const burnedCalories = props.user.burnedCalories;
    const trainingTimes = props.user.trainingTimes;

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
                water

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
                <p id="description" className="title">Plan your day</p>
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
                    <TextField id="outlined-basic" label="Name" variant="outlined" value={name}
                               onChange={(e) => setName(e.target.value)} sx={{
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black', // Farbe des Rahmens ändern, wenn das Textfeld im Fokus ist
                        },
                        '& .MuiInputLabel-outlined.Mui-focused': {
                            color: 'black', // Farbe des Labels ändern, wenn das Textfeld im Fokus ist
                        },
                    }}/>

                    <TextField id="outlined-basic" label="Gender" variant="outlined" value={gender}
                               onChange={(e) => setGender(e.target.value)} sx={{
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black', // Farbe des Rahmens ändern, wenn das Textfeld im Fokus ist
                        },
                        '& .MuiInputLabel-outlined.Mui-focused': {
                            color: 'black', // Farbe des Labels ändern, wenn das Textfeld im Fokus ist
                        },
                    }}/>
                    <TextField id="outlined-basic" label="Weight" variant="outlined" value={weight}
                               onChange={(e) => setWeight(e.target.value)} sx={{
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black', // Farbe des Rahmens ändern, wenn das Textfeld im Fokus ist
                        },
                        '& .MuiInputLabel-outlined.Mui-focused': {
                            color: 'black', // Farbe des Labels ändern, wenn das Textfeld im Fokus ist
                        },
                    }}/>
                    <TextField id="outlined-basic" label="Weight Goal" variant="outlined" value={weightGoal}
                               onChange={(e) => setWeightGoal(parseInt(e.target.value))} sx={{
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black', // Farbe des Rahmens ändern, wenn das Textfeld im Fokus ist
                        },
                        '& .MuiInputLabel-outlined.Mui-focused': {
                            color: 'black', // Farbe des Labels ändern, wenn das Textfeld im Fokus ist
                        },
                    }}/>
                    <TextField id="outlined-basic" label="Sleep Time Target" value={sleepTimeTarget}
                               onChange={(e) => setSleepTimeTarget(parseInt(e.target.value))} sx={{
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black', // Farbe des Rahmens ändern, wenn das Textfeld im Fokus ist
                        },
                        '& .MuiInputLabel-outlined.Mui-focused': {
                            color: 'black', // Farbe des Labels ändern, wenn das Textfeld im Fokus ist
                        },
                    }}/>
                    <TextField id="outlined-basic" label="Training Time Goal" variant="outlined"
                               value={trainingTimeGoal}
                               onChange={(e) => setTrainingTimeGoal(parseInt(e.target.value))} sx={{
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black', // Farbe des Rahmens ändern, wenn das Textfeld im Fokus ist
                        },
                        '& .MuiInputLabel-outlined.Mui-focused': {
                            color: 'black', // Farbe des Labels ändern, wenn das Textfeld im Fokus ist
                        },
                    }}/>
                    <TextField id="outlined-basic" label="Step Target" variant="outlined" value={stepTarget}
                               onChange={(e) => setStepTarget(parseInt(e.target.value))} sx={{
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black', // Farbe des Rahmens ändern, wenn das Textfeld im Fokus ist
                        },
                        '& .MuiInputLabel-outlined.Mui-focused': {
                            color: 'black', // Farbe des Labels ändern, wenn das Textfeld im Fokus ist
                        },
                    }}/>
                    <TextField id="outlined-basic" label="Calories Burned Target" variant="outlined"
                               value={caloriesBurnedTarget}
                               placeholder={"caloriesBurnedTarget"}
                               onChange={(e) => setCaloriesBurnedTarget(parseInt(e.target.value))} sx={{
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black', // Farbe des Rahmens ändern, wenn das Textfeld im Fokus ist
                        },
                        '& .MuiInputLabel-outlined.Mui-focused': {
                            color: 'black', // Farbe des Labels ändern, wenn das Textfeld im Fokus ist
                        },
                    }}/>
                </Box>
                <br/>
                <button className="item8">Save</button>
            </form>
        </div>
    );
}
