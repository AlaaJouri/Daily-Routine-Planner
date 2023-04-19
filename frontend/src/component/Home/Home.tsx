import {User} from "../../hooks/useAuth";
import * as React from "react";
import {useEffect, useState} from "react";
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
    let resultNutrition = 0;
    let totalSum = 0;
    if ((parseInt(lunch) + parseInt(dinner) + parseInt(snacks) + parseInt(breakfast)) === 0) {

    } else {
        totalSum = (parseInt(lunch) + parseInt(dinner) + parseInt(snacks) + parseInt(breakfast));
        resultNutrition = ((totalSum / 40) * 100);
    }


    const water = props.user.water;
    const resultWater = ((water / 2000) * 100);

    const result = Math.floor((resultWater + resultNutrition + resultWeight + resultBurnedCalories + resultTrainingTimes + resultSteps + resultSleepTime + resultBooks) / 8);

    console.log(resultWater)
    console.log(resultWeight)
    console.log(resultBurnedCalories)
    console.log(resultTrainingTimes)
    console.log(resultSteps)
    console.log(resultSleepTime)

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
                console.log("resultBooks" + resultBooks)

                // do something with the total value
            })
            .catch(console.error);
    }


    useEffect(() => {
        fetchBuecher();
    }, []);

    let bild = "";
    let resultLabel = "";
    if (result <= 40) {
        bild = "data:image/png;base64,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";
        resultLabel = "Poor job!";
    } else if (result > 40 && result < 70) {
        bild = "data:image/jpeg;base64,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";

        resultLabel = "Good Job!";
    } else if (result > 70 && result < 100) {
        resultLabel = "Well done!";
        bild = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxATERUSExMWExUVGBYXGBUYFRYYFhgWFhcYGBgSFxgYHyggGBolGxcWITEhJSotLi4uGB8/ODMsNygtLysBCgoKDg0OGxAQGy0lICUtLS0vLS0vLS0uNS0tLy0tLy0tMC8vLS0vLy0vLS0tLS0tLS0tLS0tLS0tLy0tLS0tLf/AABEIANkA6AMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABAYCAwUHAQj/xAA/EAABAwIDBQUFBQcDBQAAAAABAAIRAwQSITEFBkFRYRMicYGRBzKhsdEjQnLB4RQzUmKC8PFDkqIVJFNjsv/EABoBAQACAwEAAAAAAAAAAAAAAAAEBQECAwb/xAA3EQABAwIDBQcDAwIHAAAAAAABAAIRAyEEMUEFElFhcRMigZGhwfCx0eEUIzJC8QYVM1JicsL/2gAMAwEAAhEDEQA/APcUREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREWLSvhII114j5hYlFmi1PqBozOnr45LasoiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiItdR4ESYnJEWxERERR2ucahH3QB6n56LfK+TmsEgZrKj3gJbkOsraGnDEiecfktq1Ui7PFAzyjktptC0iHSuQ6vU7SZAjuFwHdGa7DMgATJ5mM0bTAEAZclix7X8NEN12qVGugRC02t3jLhhIw/wB+RUxQrS/pVC4U6jHlvvYXB0HSDGhW00345nJab3C61qWOUcvnmpCL4CvqyDK1RFodctBj16LXc3BachKybZozvmApaL4CvqIiIiIiIiIiIiIiIiIiIiIiL4V8Y6RKSiyXwwtArAuAHGZW6M5QyFgEFfKjoBPIT6KLXxFpewzDSWjmQDE+axvLqAW4TmCJOXpzUBlQ6SQOP1hbAKQyhvCTZUvcneu4ddMp16hqNqy0F0S1+oIjgSIjqF6bGck6LxjeS0NpenBoC2rSPQnEPRwI/pXrlne069JrmGW1G5HxGh6g5HqFFZLu67RVOz3O71Nxkg+MfL+IW2lesc7CJnXTgpa5NmKYq4e1Y54nuBwxeJGoXWXcKyfuz3cli6NCq9vjtMWto9zcnvljOYc4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Dhw6ea3p1GsPZNYAwmCIM8LnV3LMNkzYrLmT3i47wG8DIjjl/tnXU2hRtkXDWjs2u7wc58mAwgNgwScjGcmMllte6aWYXOkvwkYSHNDWl3vEHPMnIToutebAoua/CMDnZ4syAZnSYAPRYWe7tJrAKn2jgSZzAzjKAcxlx6rmcHiP9MARBEyd3hlnMai3kt/1GHLu1JMzlAnrwiVL2JZ9lRDcWLMukaZ8B0UytUwx1IC+1QY7vBZM0HgrmkxtNoY0WAsqyo5zyXE3JWFSnLg7+HTz1+C3Ii6LVERERERERERERERERERERERERERERERERaLm3bUbhcJEg6kaGRooGyLKvTdVNWsawe8uYCIwNz7o+Hp1XWRYgTK3FRwaW6HkOtuHgtNKgxslrQJMmBEnmVuRFmFoiIiIuZf7IpVcRIh7gBjGuXw6eCysdl0qcFre9hw4jqR8h5LoouIw9IP390Txj555rp21Td3N4xwn59kREXZc0RERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERF//Z"
    }
    const percentage = result;
    const [show, setShow] = useState(false);

    function Show() {
        setShow(!show)
    }

    return (
        <>
            <div className="Profile1">
                <h1 id="title" className="title">The result of the day</h1>
                <br/>
                <button onClick={Show}>Show the result</button>
                <hr/>
                <br/>
                <br/>
                <div style={{width: 300, height: 300}}>
                    {show &&
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
                            <img style={{width: 100, marginTop: -5}} src={bild} alt="smi"/>
                            <br/>
                            <br/>
                            <div style={{fontSize: 20, marginTop: -5, color: "black"}}>
                                <strong>{`${percentage}%`}</strong> {resultLabel}
                            </div>
                            <br/>
                        </CircularProgressbarWithChildren>

                    }
                    <br/>
                    <br/><br/>
                    <br/>
                </div>
            </div>
        </>
    );
};