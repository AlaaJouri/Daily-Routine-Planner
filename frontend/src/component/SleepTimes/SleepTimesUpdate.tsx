import axios from "axios";
import {ChangeEvent, FormEvent, useState} from "react";
import {User} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import HotelIcon from '@mui/icons-material/Hotel';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";


type Props = { user: User }


export default function SleepTimesUpdate(props: Props) {

    function padZero(num: number) {
        return num < 10 ? `0${num}` : `${num}`;
    }

    function handleTime1(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        const selectedTime = new Date(`2000-01-01T${value}`);
        const hours = padZero(selectedTime.getHours());
        const minutes = padZero(selectedTime.getMinutes());
        const formattedTime = `${hours}:${minutes}`;
        setSleep(formattedTime);
    }

    function handleTime2(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        const selectedTime = new Date(`2000-01-01T${value}`);
        const hours = padZero(selectedTime.getHours());
        const minutes = padZero(selectedTime.getMinutes());
        const formattedTime = `${hours}:${minutes}`;
        setStandUp(formattedTime);
    }

    const navigate1 = useNavigate();
    const gender = props.user.gender;
    const steps = props.user.steps;
    const burnedCalories = props.user.burnedCalories;


    const weightGoal = props.user.weightGoal;
    const sleepTimeTarget = props.user.sleepTimeTarget;
    const trainingTimeGoal = props.user.trainingTimeGoal;
    const stepTarget = props.user.stepTarget;
    const caloriesBurnedTarget = props.user.caloriesBurnedTarget;
    const username = props.user.username;
    const password = props.user.password;
    const name = props.user.name;
    const lunch = props.user.lunch;
    const dinner = props.user.dinner;
    const snacks = props.user.snacks;
    const id = props.user.id;
    const trainingTimes = props.user.trainingTimes;
    const breakfast = props.user.breakfast;
    const weight = props.user.weight;
    const water = props.user.water;

    const [standUp, setStandUp] = useState(props.user.standup);
    const [sleep, setSleep] = useState(props.user.sleep);

    const updateUserSleepTime = async (updatedUserData: any) => {
        axios
            .put("/api/user/" + props.user.id, updatedUserData)
            .then(() => {
                navigate1("/sleep-times");
            })
            .catch((err) => {
                alert(err.response.data.error);
            });
    }
    const handleSaveSleepTime = async (e: FormEvent<HTMLFormElement>) => {
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
                breakfast,
                lunch,
                dinner,
                snacks,
                standup: standUp,
                sleep,
                water

            };
            await updateUserSleepTime(updatedUserData);
            // show success message or navigate to a different page
        } catch (error) {
            console.error('Failed to update user data', error);
            // show error message to the user
        }
    };


    console.log("sleep"+sleep)
    console.log("stand"+standUp)
    return (
        <div className="Profile">
            <div>
                <h1 id="title" className="title">Sleep times</h1>
                <hr/>
            </div>
            <form onSubmit={handleSaveSleepTime}>


                <Timeline position="alternate">
                    <TimelineItem>
                        <TimelineOppositeContent
                            sx={{m: 'auto 0'}}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >
                            <TextField
                                id="outlined-basic"
                                type="time"
                                variant="outlined"
                                value={standUp}
                                onChange={handleTime2}
                                sx={{
                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'black', // Farbe des Rahmens ändern, wenn das Textfeld im Fokus ist
                                    },
                                    '& .MuiInputLabel-outlined.Mui-focused': {
                                        color: 'black', // Farbe des Labels ändern, wenn das Textfeld im Fokus ist
                                    },
                                }}
                            />
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector/>
                            <TimelineDot color="inherit">
                                <WbSunnyIcon/>
                            </TimelineDot>
                            <TimelineConnector/>
                        </TimelineSeparator>
                        <TimelineContent sx={{py: '12px', px: 2}}>
                            <Typography variant="h6" component="span">
                                Stand up
                            </Typography>
                            <br/>
                            <br/>
                            <br/>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineOppositeContent
                            sx={{m: 'auto 0'}}
                            variant="body2"
                            color="text.secondary"
                        >


                            <TextField
                                id="outlined-basic"
                                type="time"
                                variant="outlined"
                                value={sleep}
                                onChange={handleTime1}
                                sx={{
                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'black', // Farbe des Rahmens ändern, wenn das Textfeld im Fokus ist
                                    },
                                    '& .MuiInputLabel-outlined.Mui-focused': {
                                        color: 'black', // Farbe des Labels ändern, wenn das Textfeld im Fokus ist
                                    },
                                }}
                            />

                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector/>
                            <TimelineDot color="inherit">
                                <HotelIcon/>
                            </TimelineDot>
                            <TimelineConnector/>
                        </TimelineSeparator>
                        <TimelineContent sx={{py: '12px', px: 2}}>
                            <Typography variant="h6" component="span">
                                Sleep
                            </Typography>
                            <br/> <br/>
                            <Typography> </Typography>
                        </TimelineContent>
                    </TimelineItem>


                </Timeline>
                <br/>
                <button className="item8"> Speichern</button>
            </form>
        </div>
    );


}
