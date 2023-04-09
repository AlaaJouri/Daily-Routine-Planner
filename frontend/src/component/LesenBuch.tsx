import {Buch} from "../model/Buch";
import {Link} from "react-router-dom";

type BuchProps = {
    buch: Buch
    deleteBuch: (id: string) => void
}

export default function LesenBuch(props: BuchProps) {
    function handleDelete() {
        props.deleteBuch(props.buch.id)
    }

    return (
        <div className={"workout-card"}>
            <h2>{props.buch.title}</h2>

            <Link to={"/workouts/" + props.buch.id}>Details</Link>
            <button className={"buch-delete"} onClick={handleDelete}>Delete this workout</button>
            <button className={"buch-delete"}><Link className={"link-header"} to={"/buecher/update/"+ props.buch.id}>Update Buch</Link></button>
        </div>
    )
}