import {UserData} from "../model/UserData";
import {ChangeEvent, useEffect, useState} from "react";
import "./UserData.css";
import {useParams} from "react-router-dom";
import axios from "axios";

type UserDataProps = {
    addUserData: (userDataToAdd: UserData) => void,

}

export default function ProfileUserData(props: UserDataProps) {
    //const params = useParams();
   // const id: string | undefined = params.id;
    const [userDataToAdd, setUserDataToAdd] = useState<UserData>({
       // id: id ? id : "",
        "id":"",
        "name": "",
        "gender": "",
        "weight": "",
        "weightGoal": 0,
        "sleepTimeTarget": 0,
        "trainingTimeGoal": 0,
        "stepTarget": 0,
        "caloriesBurnedTarget": 0
    });

    const requestURL: string = "/api/userdata/" + "b78e5e82-360e-49d2-a362-3b106d07c34c"
    useEffect(() => {
        axios
            .get(requestURL)
            .then((response) => {
                setUserDataToAdd(response.data);
            })
            .catch((error) => console.error(error));
    }, [requestURL]);

    function handleChangeName(event: ChangeEvent<HTMLInputElement>) {
        setUserDataToAdd({
            ...userDataToAdd,
            name: event.target.value,
        });
    }

    function handleChangeWeight(event: ChangeEvent<HTMLInputElement>) {
        setUserDataToAdd({
            ...userDataToAdd,
            weight: event.target.value,
        });
    }

    function handleChangeGender(event: ChangeEvent<HTMLInputElement>) {
        setUserDataToAdd({
            ...userDataToAdd,
            gender: event.target.value,
        });
    }

    function handleChangeWeightGoal(event: ChangeEvent<HTMLInputElement>) {
        setUserDataToAdd({
            ...userDataToAdd,
            weightGoal: parseInt(event.target.value),
        });
    }

    function handleChangeSleepTimeTarget(event: ChangeEvent<HTMLInputElement>) {
        setUserDataToAdd({
            ...userDataToAdd,
            sleepTimeTarget: parseInt(event.target.value),
        });
    }

    function handleChangeTrainingTimeGoal(event: ChangeEvent<HTMLInputElement>) {
        setUserDataToAdd({
            ...userDataToAdd,
            trainingTimeGoal: parseInt(event.target.value),
        });
    }

    function handleChangeStepTarget(event: ChangeEvent<HTMLInputElement>) {
        setUserDataToAdd({
            ...userDataToAdd,
            stepTarget: parseInt(event.target.value),
        });
    }

    function handleChangeCaloriesBurnedTarget(event: ChangeEvent<HTMLInputElement>) {
        setUserDataToAdd({
            ...userDataToAdd,
            caloriesBurnedTarget: parseInt(event.target.value),
        });
    }


    function handleClickAddUserData() {
        props.addUserData(userDataToAdd);
        setUserDataToAdd({
            ...userDataToAdd,
            id: "",
            name: "",
            gender: "",
            weight: "",
            weightGoal: 0,
            sleepTimeTarget: 0,
            trainingTimeGoal: 0,
            stepTarget: 0,
            caloriesBurnedTarget: 0
        })
    }

    return (


        <div className="Profile">
            <div>
                <h1 id="title">Profile</h1>
                <p id="description">Planen Sie Ihren Tag</p>
                <hr/>
            </div>
            <form id="survey-form" className="container">
                <div className="item0">
                    <label htmlFor="name">Name</label>
                    <br/>
                    <input value={userDataToAdd.name} onChange={handleChangeName}/>

                    <br/>
                </div>
                <div className="item1">
                    <label htmlFor="Geschlecht">Geschlecht</label>
                    <br/>
                    <input value={userDataToAdd.gender} onChange={handleChangeGender}/>

                    <br/>
                </div>
                <div className="item2">
                    <label htmlFor="Gewicht">Gewicht</label>
                    <br/>
                    <input value={userDataToAdd.weight} onChange={handleChangeWeight}/>

                    <br/>
                </div>
                <div className="item3">
                    <label htmlFor="Zielgewicht">Zielgewicht</label>
                    <br/>
                    <input value={userDataToAdd.weightGoal} onChange={handleChangeWeightGoal}/>


                    <br/>
                </div>
                <div className="item4">
                    <label htmlFor="Schlafzeitziel">Schlafzeitziel</label>
                    <br/>
                    <input value={userDataToAdd.sleepTimeTarget} onChange={handleChangeSleepTimeTarget}/>

                    <br/>
                </div>
                <div className="item5">
                    <label htmlFor="TrainingszeitZiel">Trainingszeit Ziel</label>
                    <br/>
                    <input value={userDataToAdd.trainingTimeGoal} onChange={handleChangeTrainingTimeGoal}/>

                    <br/>
                </div>
                <div className="item6">
                    <label htmlFor="SchrittZiel">SchrittZiel</label>
                    <br/>
                    <input value={userDataToAdd.stepTarget}  onChange={handleChangeStepTarget}/>

                    <br/>
                </div>
                <div className="item7">
                    <label htmlFor="KalorienverbrauchZiel">KalorienverbrauchZiel</label>
                    <br/>
                    <input value={userDataToAdd.caloriesBurnedTarget} onChange={handleChangeCaloriesBurnedTarget}
                           placeholder={"caloriesBurnedTarget"}/>

                    <br/>
                </div>
                <button className="item8" onClick={handleClickAddUserData}>Speichern</button>

            </form>
        </div>
    );
}