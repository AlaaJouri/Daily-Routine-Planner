import {Buch} from "../model/Buch";
import {ChangeEvent, useState} from "react";

type AddBuchProps = {
    addbuch: (buchToAdd: Buch) => void,
}

export default function AddBuch(props: AddBuchProps) {

    const [buchToAdd, setBuchToAdd] = useState<Buch>({
        id: "",
        title: "",
        isChecked:false
    });


    function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
        setBuchToAdd({
            ...buchToAdd,
            title: event.target.value,
        });
    }

    function handleClickAddBuch() {
        props.addbuch(buchToAdd);
        setBuchToAdd({
            ...buchToAdd,
            id: "",
            title: "",
        })
    }

    return (
        <div className={"row"}>
            <input className={"text-input"} value={buchToAdd.title} onChange={handleChangeTitle} placeholder={"title"}/>
            <button onClick={handleClickAddBuch}>Add</button>
        </div>
    );
}
