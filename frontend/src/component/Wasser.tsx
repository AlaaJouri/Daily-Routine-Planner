import {FormEvent, useState} from "react";
import "./Wasser.css";
import * as React from "react";
import {User} from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import axios from "axios";

type Props = { user: User }

interface CupProps {
    amount: number;
    index: number;
    onClick: (index: number) => void;
}

function DrinkWasser({amount, index, onClick}: CupProps) {

    const isFull = amount > 0;

    function handleClick() {
        onClick(index);
    }

    return (
        <div
            className={`water-cup ${isFull ? "full" : ""}`}
            onClick={handleClick}
            data-index={index}
        >
            {isFull ? `${amount} ml` : "250 ml"}
        </div>
    );
}


export default function Wasser(props: Props) {
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
    const [water, setWater] = useState(props.user.water);

    const steps = props.user.steps;
    const burnedCalories = props.user.burnedCalories;
    const trainingTimes = props.user.trainingTimes;

    let result = water;
    const updateWater = async (updatedUserData: any) => {
        axios
            .put("/api/user/" + props.user.id, updatedUserData)
            .then(() => {
                navigate2("/water");
            })
            .catch((err) => {
                alert(err.response.data.error);
            });
    }
    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const updatedUserDataWater = {
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
                water,
                snacks,
                standup,
                sleep


            };
            await updateWater(updatedUserDataWater);
            // show success message or navigate to a different page
        } catch (error) {
            console.error('Failed to update user data', error);
            // show error message to the user
        }
    };
    const [cups, setCups] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);
    if (result >= 250 && result <= 2000 && result % 250 === 0) {
        let cupsToFill = result / 250;
        cups.fill(250, 0, cupsToFill);
    }
    const totalAmount = cups.reduce((acc, cur) => acc + cur, 0);
    const targetAmount = 2000;

    function handleCupClick(index: number) {
        const newCups = [...cups];
        newCups[index] = newCups[index] === 0 ? 250 : 0;
        setCups(newCups);

        result = 250 + result;
        setWater(result)


    }

    return (
        <div className="Profile">
            <h1 id="title" className="title">Wasser trinken</h1>
            <p id="description" className="title">Ziel: 2 Liter / Tag</p>
            <form onSubmit={handleSave}>
                <div id="totalJar">
                    <div id="total">{`${((totalAmount / targetAmount) * 100) / 1000}L left`}</div>
                    <div
                        id="percentage"
                        style={{height: `${(totalAmount / targetAmount) * 100}%`}}
                    ></div>
                </div>
                <h2 className="title">Wie viele hast du heute getrunken</h2>
                <div className="cups">
                    {cups.map((amount, index) => (
                        <DrinkWasser
                            key={index}
                            amount={amount}
                            index={index}
                            onClick={handleCupClick}


                        />
                    ))}
                </div>
                <button className="item8"> Speichern</button>

            </form>
        </div>
    );
}