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
    const Ergbnis = (stepTarget / steps) * 100;

    const trainingTimes = props.user.trainingTimes;
    const trainingTimeGoal = props.user.trainingTimeGoal;


    const burnedCalories = props.user.burnedCalories;
    const caloriesBurnedTarget = props.user.caloriesBurnedTarget;


    const weight = props.user.weight;
    const weightGoal = props.user.weightGoal;

    const standup = props.user.standup;
    const sleep = props.user.sleep;
    const sleepTimeTarget = props.user.sleepTimeTarget;


    const lunch = props.user.lunch;
    const dinner = props.user.dinner;
    const snacks = props.user.snacks;
    const breakfast = props.user.breakfast;
    

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
            <p>{Ergbnis}</p>

        </>
    )
}