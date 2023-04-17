import useAuth, {User} from "../hooks/useAuth";
import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Buch} from "../model/Buch";
import 'react-circular-progressbar/dist/styles.css';
import {CircularProgressbarWithChildren} from 'react-circular-progressbar';

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
    const resultSleepTime = ((parseInt(sleep) - parseInt(standup) / sleepTimeTarget) * 100);
    console.log("sleep" + sleep)
    console.log("standup" + standup)
    console.log("sleepTimeTarget" + sleepTimeTarget)
    const sleepTime = Date.parse(`1970-01-01T${sleep}:00.000Z`);
    const standupTime = Date.parse(`1970-01-01T${standup}:00.000Z`);
    const actualSleepTime = (standupTime - sleepTime) / (1000 * 60 * 60);

    const lunch = props.user.lunch;
    const dinner = props.user.dinner;
    const snacks = props.user.snacks;
    const breakfast = props.user.breakfast;
    const totalSum = (parseInt(lunch) + parseInt(dinner) + parseInt(snacks) + parseInt(breakfast));
    const summe = (totalSum == 0 ? 1 : totalSum);
    const resultNutrition = ((summe / 80) * 100);

    const water = props.user.water;
    const resultWater = ((water / 2000) * 100);
    console.log("resultNutrition" + resultNutrition)
    console.log("resultSteps" + resultSteps)
    console.log("resultWeight" + resultWeight)
    console.log("resultTrainingTimes" + resultTrainingTimes)
    console.log("resultBurnedCalories" + resultBurnedCalories)
    console.log("resultWater" + resultWater)
    console.log(resultBooks)
    const result = (resultWater + resultNutrition + resultWeight + resultBurnedCalories + resultTrainingTimes + resultSteps) / 6;
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

                resultBooks = ((checkedBooksTotal / (checkedBooks.length * 10)) * 100);
                console.log("result" + result)
                // do something with the total value
            })
            .catch(console.error);
    }


    useEffect(() => {
        fetchBuecher();
    }, []);
    const percentage = 50;
    const bild = "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcm0yMzViYXRjaDUtbm9vbi0yMi5wbmc.png?s=KXgrf2XQmoDOCW-VwE5n6CmnuHaa4vkQZLkArjjjhbk";

    return (
        <>
            <div className="Profile">
                <button className="item8"> Prüfen</button>
                <br/>
                <br/>
                <div style={{width: 300, height: 300}}>
                    <CircularProgressbarWithChildren value={percentage}>
                        {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
                        <img style={{width: 40, marginTop: -5}} src={bild} alt="smi"/>
                        <div style={{fontSize: 20, marginTop: -5}}>
                            <strong>{`${percentage}%`}</strong> mate
                        </div>
                    </CircularProgressbarWithChildren>;
                </div>


            </div>
        </>
    );
};


// const [progress] = useState(283);
