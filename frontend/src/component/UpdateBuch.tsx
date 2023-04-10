import {Buch} from "../model/Buch";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import * as React from "react";


type UpdateBuchProps = {
    buch: Buch[]
    updateBuch: (buchToUpdate: Buch) => void
}

export default function UpdateBuch(props: UpdateBuchProps) {

    const params = useParams()
    const id: string | undefined = params.id

    const [buchToUpdate, setBuchToUpdate] = useState<Buch>({
        id: id ? id : "",
        title: "",
    });

    const [buch, setBuch] = useState<Buch | undefined>();


    function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
        setBuchToUpdate({
            ...buchToUpdate,
            title: event.target.value
        })
    }


    function onSave(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        props.updateBuch(buchToUpdate);
        setBuchToUpdate({
            ...buchToUpdate,
            id: "",
            title: "",
        })
    }

    return (
        <div className="Profile">
            <form onSubmit={onSave}>
                <div className={"row"}>
                    <input className={"text-input"} type="text" placeholder={buch?.title} value={buchToUpdate.title}
                           onChange={onChangeTitle}/>
                </div>
                <button>Update</button>
                <IconButton><Link className={"link-header"} to={"/lessen"}>Zurück </Link></IconButton>

            </form>
        </div>

    )
}
