import "./UserData.css";
import useAuth, {User} from "../hooks/useAuth";
import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Buch} from "../model/Buch";

type Props = { user: User }
export default function Home(props: Props) {

    const {user} = useAuth(false);

    const navigate1 = useNavigate();
    const [buch, setBuch] = useState<Buch[]>([])
    const id = props.user.id;

    const steps = props.user.steps;
    const stepTarget = props.user.stepTarget;
    const resultSteps = ((stepTarget / steps) * 100);

    const trainingTimes = props.user.trainingTimes;
    const trainingTimeGoal = props.user.trainingTimeGoal;
    const resultTrainingTimes = ((trainingTimeGoal / trainingTimes) * 100);

    const burnedCalories = props.user.burnedCalories;
    const caloriesBurnedTarget = props.user.caloriesBurnedTarget;
    const resultBurnedCalories = ((caloriesBurnedTarget / burnedCalories) * 100);


    const weight = props.user.weight;
    const weightGoal = props.user.weightGoal;
    const resultWeight = ((weightGoal / parseInt(weight)) * 100);


    const standup = props.user.standup;
    const sleep = props.user.sleep;
    const sleepTimeTarget = props.user.sleepTimeTarget;
    const resultsleepTime = (sleepTimeTarget / (parseInt(sleep) - parseInt(standup)) * 100);


    const lunch = props.user.lunch;
    const dinner = props.user.dinner;
    const snacks = props.user.snacks;
    const breakfast = props.user.breakfast;
    const totalSum = (parseInt(lunch) + parseInt(dinner) + parseInt(snacks) + parseInt(breakfast));
    const summe = (totalSum == 0 ? 1 : totalSum);
    const resultNutrition = ((80 / summe) * 100);


    function fetchBuecher() {
        axios.get("/api/book")
            .then(response => {
                setBuch(response.data);
            })
            .catch(console.error);
    }

    useEffect(() => {
        fetchUser();
    }, []);

    function fetchUser() {
        const requestURL: string = "/api/user/" + id;
        axios
            .get(requestURL)
            .then(response => {
                const userData = response.data;
                // do something with user data
            })
            .catch((err) => {
                alert(err.response.data.error);
            });
    }

    const requestURL: string = "/api/user/" + id


    axios
        .get(requestURL)
        .then(() => {
            navigate1("/Home");
        })
        .catch((err) => {
            alert(err.response.data.error);
        });


    if (!user) return <p> User not fund</p>;
    return (


        <>
            <p>{resultNutrition}</p>
            <p>{resultSteps}</p>
            <p>{resultsleepTime}</p>
            <p>{resultWeight}</p>
            <p>{resultTrainingTimes}</p>
            <p>{resultBurnedCalories}</p>
        </>
    )
}