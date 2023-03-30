import "./UserData.css";
import useAuth from "../hooks/useAuth";
import {FormEvent, useState} from "react";

export default function ProfileUserData() {
    const { user } = useAuth(false);

    const [name, setName] = useState(user ? user.name : '');
    const [gender, setGender] = useState(user ? user.gender : '');
    const [weight, setWeight] = useState(user ? user.weight : '');
    const [weightGoal, setWeightGoal] = useState(user ? user.weightGoal : '');
    const [sleepTimeTarget, setSleepTimeTarget] = useState(user ? user.sleepTimeTarget : '');
    const [trainingTimeGoal, setTrainingTimeGoal] = useState(user ? user.trainingTimeGoal : '');
    const [stepTarget, setStepTarget] = useState(user ? user.stepTarget : '');
    const [caloriesBurnedTarget, setCaloriesBurnedTarget] = useState(user ? user.caloriesBurnedTarget : '');
    const updateUser = async (updatedUserData: any) => {
        try {
            const response = await fetch('/api/user/'+user?.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUserData)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to update user data', error);
            throw new Error('Failed to update user data');
        }
    };
    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const updatedUserData = {
                name,
                gender,
                weight,
                weightGoal,
                sleepTimeTarget,
                trainingTimeGoal,
                stepTarget,
                caloriesBurnedTarget,
            };
            await updateUser(updatedUserData);
            // show success message or navigate to a different page
        } catch (error) {
            console.error('Failed to update user data', error);
            // show error message to the user
        }
    };



    if (!user) return <p> User not fund</p>;

    return (
        <div className="Profile">
            <div>
                <h1 id="title">Profile</h1>
                <p id="description">Planen Sie Ihren Tag</p>
                <hr />
            </div>
            <form id="survey-form" className="container" onSubmit={handleSave}>
                <div className="item0">
                    <label htmlFor="name">Name</label>
                    <br />
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                    <br />
                </div>
                <div className="item1">
                    <label htmlFor="Geschlecht">Geschlecht</label>
                    <br />
                    <input value={gender} onChange={(e) => setGender(e.target.value)} />
                    <br />
                </div>
                <div className="item2">
                    <label htmlFor="Gewicht">Gewicht</label>
                    <br />
                    <input value={weight} onChange={(e) => setWeight(e.target.value)} />
                    <br />
                </div>
                <div className="item3">
                    <label htmlFor="Zielgewicht">Zielgewicht</label>
                    <br />
                    <input value={weightGoal} onChange={(e) => setWeightGoal(parseInt( e.target.value))} />
                    <br />
                </div>
                <div className="item4">
                    <label htmlFor="Schlafzeitziel">Schlafzeitziel</label>
                    <br />
                    <input value={sleepTimeTarget} onChange={(e) => setSleepTimeTarget(parseInt(e.target.value))} />
                    <br />
                </div>
                <div className="item5">
                    <label htmlFor="TrainingszeitZiel">Trainingszeit Ziel</label>
                    <br />
                    <input value={trainingTimeGoal} onChange={(e) => setTrainingTimeGoal(parseInt(e.target.value))} />
                </div>
                    <div className="item6">
                    <label htmlFor="SchrittZiel">SchrittZiel</label>
                    <br/>
                    <input value={user.stepTarget}/>

                    <br/>
                </div>
                <div className="item7">
                    <label htmlFor="KalorienverbrauchZiel">KalorienverbrauchZiel</label>
                    <br/>
                    <input value={user.caloriesBurnedTarget}
                           placeholder={"caloriesBurnedTarget"}/>

                    <br/>
                </div>
                <button className="item8"> Speichern</button>

            </form>
        </div>
    );
}
