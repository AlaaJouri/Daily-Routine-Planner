import {Buch} from "../model/Buch";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";


type UpdateBuchProps = {
    buch:Buch[]
    updateBuch: (buchToUpdate: Buch) => void
}

export default function UpdateBuch (props: UpdateBuchProps) {

    const params = useParams()
    const id: string | undefined = params.id

    const [buchToUpdate, setBuchToUpdate] = useState<Buch>({
        id: id ? id : "",
        title: "",
    });

    const [buch, setBuch] = useState<Buch | undefined>();

    const requestURL: string = "/api/buecher/" + id

    useEffect(() => {
        axios
            .get(requestURL)
            .then((response) => {
                setBuch(response.data);
                console.log(buch);
            })
            .catch((error) => console.error(error));
    }, [requestURL]);

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
                <input className={"text-input"} type="text" placeholder={buch?.title} value={buchToUpdate.title} onChange={onChangeTitle}/>
            </div>
            <button>Update</button>
        </form>
        </div>

    )
}
