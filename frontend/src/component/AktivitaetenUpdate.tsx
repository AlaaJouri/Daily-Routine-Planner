import axios from "axios";
import {FormEvent, useState} from "react";
import  {User} from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";

type Props= {user:User}


export default function AktivitaetenUpdate(props:Props) {

    const navigate = useNavigate();
    const [gender, setGender] = useState(props.user.gender);
    const [weight, setWeight] = useState(props.user.weight);
    const [weightGoal, setWeightGoal] = useState(props.user.weightGoal);
    const [sleepTimeTarget, setSleepTimeTarget] = useState(props.user.sleepTimeTarget);
    const [trainingTimeGoal, setTrainingTimeGoal] = useState(props.user.trainingTimeGoal);
    const [stepTarget, setStepTarget] = useState(props.user.stepTarget);
    const [caloriesBurnedTarget, setCaloriesBurnedTarget] = useState(props.user.caloriesBurnedTarget);
    const id=props.user.id;
    const username=props.user.username;
    const password=props.user.password;
    const [name, setName] = useState(props.user.name);
    const [steps, setSteps] = useState(props.user.steps);
    const [burnedCalories, setBurnedCalories] = useState(props.user.burnedCalories);
    const [trainingTimes, setTrainingTimes] = useState(props.user.trainingTimes);

    const updateUser = async (updatedUserData: any) => {
        axios
            .put("/api/user/" + props.user.id,updatedUserData)
            .then(() => {
                navigate("/activity");
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
                trainingTimes


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
                <h1 id="title">Aktivitäten</h1>
                <hr/>
            </div>
            <form id="survey-form" className="container" onSubmit={handleSave}>
                <div className="item0">
                    <label htmlFor="steps">Schritten</label>
                    <br/>
                    <input value={steps} onChange={(e) => setSteps(parseInt(e.target.value))}/>
                    <br/>
                </div>
                <div className="item1">
                    <label htmlFor="burnedCalories">vebrannten Kaloriern</label>
                    <br/>
                    <input value={burnedCalories} onChange={(e) => setBurnedCalories(parseInt(e.target.value))}/>
                    <br/>
                </div>
                <div className="item2">
                    <label htmlFor="trainingTimes">Trainingszeiten</label>
                    <br/>
                    <input value={trainingTimes} onChange={(e) => setTrainingTimes(parseInt(e.target.value))}/>
                    <br/>
                </div>

                <button className="item8"> Speichern</button>

            </form>
        </div>
    );
}
