import {User} from "../../hooks/useAuth";
import * as React from "react";
import {useEffect} from "react";
import axios from "axios";
import {Book} from "../../model/Book";
import 'react-circular-progressbar/dist/styles.css';
import {CircularProgressbarWithChildren} from 'react-circular-progressbar';

type Props = { user: User }
let resultBooks = 0;

export default function Home(props: Props) {


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
    const resultWeight = ((weightGoal / parseInt(weight)) * 100);

    const standUp = props.user.standup;
    const sleep = props.user.sleep;
    const sleepTimeTarget = props.user.sleepTimeTarget;


    const standUpTime = new Date(`2000-01-01T${standUp}`).getTime();
    const sleepTime = new Date(`2000-01-01T${sleep}`).getTime();
    const timeDiffMs = sleepTime - standUpTime;
    const hours = Math.floor(timeDiffMs / 1000 / 60 / 60);
    const minutes = Math.floor((timeDiffMs / 1000 / 60) % 60);

    const resultTime = new Date(`2000-01-01T${standUp}`);
    resultTime.setHours(resultTime.getHours() + hours);
    resultTime.setMinutes(resultTime.getMinutes() + minutes);

    const formattedTime = resultTime.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit'
    }).slice(0, -3);

    const [hours1, minutes1] = formattedTime.split(':');
    const totalHours = parseInt(hours1) + parseInt(minutes1) / 60;
    const resultSleepTime = (sleepTimeTarget / totalHours) * 100;


    const lunch = props.user.lunch;
    const dinner = props.user.dinner;
    const snacks = props.user.snacks;
    const breakfast = props.user.breakfast;
    const totalSum = (parseInt(lunch) + parseInt(dinner) + parseInt(snacks) + parseInt(breakfast));
    const summe = (totalSum === 0 ? 1 : totalSum);
    const resultNutrition = ((summe / 80) * 100);

    const water = props.user.water;
    const resultWater = ((water / 2000) * 100);

    const result = Math.floor((resultWater + resultNutrition + resultWeight + resultBurnedCalories + resultTrainingTimes + resultSteps + resultSleepTime) / 7);


    function fetchBuecher() {
        axios.get("/api/book")
            .then(response => {
                const books: Book[] = response.data; // declare type of 'books'
                // map through the array of books and assign 10 to a variable if ischecked is true
                const checkedBooks: number[] = books.map((book: Book) => {
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

                // do something with the total value
            })
            .catch(console.error);
    }


    useEffect(() => {
        fetchBuecher();
    }, []);
    const percentage = result;
    const bild = "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcm0yMzViYXRjaDUtbm9vbi0yMi5wbmc.png?s=KXgrf2XQmoDOCW-VwE5n6CmnuHaa4vkQZLkArjjjhbk";

    return (
        <>
            <div className="Profile">
                <button className="item8"> Show the result</button>
                <br/>
                <br/>
                <div style={{width: 300, height: 300}}>
                    <CircularProgressbarWithChildren value={percentage} styles={{
                        trail: {
                            // Trail color
                            stroke: '#d6d6d6',
                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: 'butt',
                            // Rotate the trail
                            transform: 'rotate(0.25turn)',
                            transformOrigin: 'center center',
                        },
                        background: {
                            fill: '#5acb1a',
                        },
                    }}>
                        <img style={{width: 40, marginTop: -5}} src={bild} alt="smi"/>
                        <div style={{fontSize: 20, marginTop: -5}}>
                            <strong>{`${percentage}%`}</strong> mate
                        </div>
                    </CircularProgressbarWithChildren>
                </div>


            </div>
        </>
    );
};


// const [progress] = useState(283);
