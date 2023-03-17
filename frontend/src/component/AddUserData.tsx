
import {UserData} from "../model/UserData";
import {ChangeEvent, useState} from "react";

type AddUserDataProps = {
    addUserData: (userDataToAdd: UserData) => void,
}

export default function  AddUserData(props: AddUserDataProps) {

    const [userDataToAdd, setUserDataToAdd] = useState<UserData>({
        "id":"",
        "name": "",
        "gender": "",
        "weight": ""
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
    function handleClickAddUserData() {
        props.addUserData(userDataToAdd);
        setUserDataToAdd({
            ...userDataToAdd,
            id:"",
            name: "",
            gender: "",
            weight: ""
        })
    }

    return (
        <div className={"row"}>
            <input className={"text-input"} value={userDataToAdd.name} onChange={handleChangeName} placeholder={"name"}/>
            <input className={"large-input"} value={userDataToAdd.gender} onChange={handleChangeGender} placeholder={"gender"}/>
            <input className={"large-input"} value={userDataToAdd.weight} onChange={handleChangeWeight} placeholder={"weight"}/>
            <button onClick={handleClickAddUserData}>Add your Data</button>
        </div>
    );
}
