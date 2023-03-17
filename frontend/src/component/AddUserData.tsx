import {UserData} from "../model/UserData";
import {ChangeEvent, useState} from "react";

type AddUserDataProps = {
    addUserData: (userDataToAdd: UserData) => void,
}

export default function AddUserData(props: AddUserDataProps) {

    const [userDataToAdd, setUserDataToAdd] = useState<UserData>({
        "id": "",
        "name": "",
        "gender": "",
        "weight": "",
        "weightGoal": 0,
        "sleepTimeTarget": 0,
        "trainingTimeGoal": 0,
        "stepTarget": 0,
        "caloriesBurnedTarget": 0
    });

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
        <div className={"row"}>
            <input value={userDataToAdd.name} onChange={handleChangeName} placeholder={"name"}/>
            <input value={userDataToAdd.gender} onChange={handleChangeGender} placeholder={"gender"}/>
            <input value={userDataToAdd.weight} onChange={handleChangeWeight} placeholder={"weight"}/>
            <input value={userDataToAdd.weightGoal} onChange={handleChangeWeightGoal} placeholder={"weightGoal"}/>
            <input value={userDataToAdd.sleepTimeTarget} onChange={handleChangeSleepTimeTarget} placeholder={"sleepTimeTarget"}/>
            <input value={userDataToAdd.trainingTimeGoal} onChange={handleChangeTrainingTimeGoal} placeholder={"trainingTimeGoal"}/>
            <input value={userDataToAdd.stepTarget} onChange={handleChangeStepTarget} placeholder={"stepTarget"}/>
            <input value={userDataToAdd.caloriesBurnedTarget} onChange={handleChangeCaloriesBurnedTarget}
                   placeholder={"caloriesBurnedTarget"}/>
            <button onClick={handleClickAddUserData}>Add your Data</button>
        </div>
    );
}
