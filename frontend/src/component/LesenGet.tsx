import "./UserData.css";
import useAuth from "../hooks/useAuth";
import LesenBuecher from "./LesenBuecher";
import AddBuch from "./AddBuch";
import UpdateBuch from "./UpdateBuch";
import {useEffect, useState} from "react";
import {Buch} from "../model/Buch";
import axios from "axios";

export default function LesenGet() {
    const {user} = useAuth(false);
    const [buch, setBuch] = useState<Buch[]>([])


    function fetchBuecher() {
        axios.get("/api/buecher")
            .then(response => {
                setBuch(response.data);
            })
            .catch(console.error);
    }

    function deleteBuch(id: string) {
        axios.delete("/api/buecher/" + id)
            .then(fetchBuecher)
            .catch(console.error);
    }
    function updateBuch(buch: Buch) {
        axios.put("/api/buecher/" + buch.id, buch)
            .then(fetchBuecher)
            .catch(console.error);
    }


    useEffect(() => {
        fetchBuecher()
    }, [])

    function addBuch(buchToAdd: Buch) {
        axios.post("/api/buecher", buchToAdd)
            .then((response) => {
                setBuch([...buch, response.data])
            })
            .catch((error) => {
                console.error("I'm sorry. Something went wrong!" + error)
            });
    }


    if (!user) return <p> User not fund</p>;
    return(
        <>
            <LesenBuecher buecher={buch} deleteBuch={deleteBuch}/>
            <AddBuch addBuch={addBuch}/>
            <UpdateBuch  buch={buch}  updateBuch={updateBuch}/>
        </>
    )
}
