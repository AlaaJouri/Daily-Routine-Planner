import "./UserData.css";
import useAuth, {User} from "../hooks/useAuth";
import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Buch} from "../model/Buch";

type Props = { user: User }
let resultBooks = 0;
export default function Home(props: Props) {

    const {user} = useAuth(false);

    const navigate1 = useNavigate();
    const [buch, setBuch] = useState<Buch[]>([])
    const id = props.user.id;

    const steps = props.user.steps;
    const stepTarget = props.user.stepTarget;
    const resultSteps = ((steps / stepTarget) * 100);

    const trainingTimes = props.user.trainingTimes;
    const trainingTimeGoal = props.user.trainingTimeGoal;
    const resultTrainingTimes = ((trainingTimes / trainingTimeGoal) * 100);

    const burnedCalories = props.user.burnedCalories;
    const caloriesBurnedTarget = props.user.caloriesBurnedTarget;
    const resultBurnedCalories = ((burnedCalories / caloriesBurnedTarget) * 100);


    const weight = props.user.weight;
    const weightGoal = props.user.weightGoal;
    const resultWeight = ((parseInt(weight) / weightGoal) * 100);


    const standup = props.user.standup;
    const sleep = props.user.sleep;
    const sleepTimeTarget = props.user.sleepTimeTarget;
    const resultsleepTime = ((parseInt(sleep) - parseInt(standup) / sleepTimeTarget) * 100);


    const lunch = props.user.lunch;
    const dinner = props.user.dinner;
    const snacks = props.user.snacks;
    const breakfast = props.user.breakfast;
    const totalSum = (parseInt(lunch) + parseInt(dinner) + parseInt(snacks) + parseInt(breakfast));
    const summe = (totalSum == 0 ? 1 : totalSum);
    const resultNutrition = ((summe / 80) * 100);

    const water = props.user.water;
    const resultWater = ((water / 2000) * 100);


    console.log(resultBooks)


    function fetchBuecher() {
        axios.get("/api/book")
            .then(response => {
                const books: Buch[] = response.data; // declare type of 'books'
                // map through the array of books and assign 10 to a variable if ischecked is true
                const checkedBooks: number[] = books.map((book: Buch) => {
                    // declare types of 'book' and return value

                    if (book.isChecked) {
                        return 10;
                    } else {
                        return 0;
                    }

                });

                // sum the values in the checkedBooks array to get the total value
                const checkedBooksTotal: number = checkedBooks.reduce((total: number, value: number) => total + value, 0); // declare types of 'total' and 'value', and return value
                console.log(checkedBooksTotal)

                console.log(checkedBooks.length)
                resultBooks = ((checkedBooksTotal / (checkedBooks.length * 10)) * 100);
                console.log(resultBooks)
                // do something with the total value
            })
            .catch(console.error);
    }

    console.log(resultBooks)
    useEffect(() => {
        fetchBuecher();
    }, []);


    if (!user) return <p> User not fund</p>;
    return (
        <>
            <p>{resultNutrition}</p>
            <p>{resultSteps}</p>
            <p>{resultsleepTime}</p>
            <p>{resultWeight}</p>
            <p>{resultTrainingTimes}</p>
            <p>{resultBurnedCalories}</p>
            <p>{resultWater}</p>
            <p>{resultBooks}</p>
        </>
    )
}