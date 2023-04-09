import {Buch} from "../model/Buch";
import {ChangeEvent, useState} from "react";

type AddBuchProps = {
    addBuch: (buchToAdd: Buch) => void,
}

export default function AddBuch(props: AddBuchProps) {

    const [buchToAdd, setBuchToAdd] = useState<Buch>({
        id: "",
        title: "",
    });


    function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
        setBuchToAdd({
            ...buchToAdd,
            title: event.target.value,
        });
    }

    function handleClickAddBuch() {
        props.addBuch(buchToAdd);
        setBuchToAdd({
            ...buchToAdd,
            id: "",
            title: "",
        })
    }

    return (
        <div className={"row"}>
            <input className={"text-input"} value={buchToAdd.title} onChange={handleChangeTitle} placeholder={"title"}/>
            <button onClick={handleClickAddBuch}>Add your Bookk</button>
        </div>
    );
}
