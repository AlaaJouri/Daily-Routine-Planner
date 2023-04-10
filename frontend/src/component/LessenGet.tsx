import "./UserData.css";
import useAuth from "../hooks/useAuth";
import LessenBuecher from "./LessenBuecher";
import AddBuch from "./AddBuch";
import UpdateBuch from "./UpdateBuch";
import {useEffect, useState} from "react";
import {Buch} from "../model/Buch";
import axios from "axios";
import Divider from '@mui/material/Divider';
import * as React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";


export default function LessenGet() {
    const {user} = useAuth(false);
    const [buch, setBuch] = useState<Buch[]>([])


    function fetchBuecher() {
        axios.get("/api/book")
            .then(response => {
                setBuch(response.data);
            })
            .catch(console.error);
    }

    function deleteBuch(id: string) {
        axios.delete("/api/book/" + id)
            .then(fetchBuecher)
            .catch(console.error);
    }


    useEffect(() => {
        fetchBuecher()
    }, [])

    function addBuch(buchToAdd: Buch) {
        axios.post("/api/book", buchToAdd)
            .then((response) => {
                setBuch([...buch, response.data])
            })
            .catch((error) => {
                console.error("I'm sorry. Something went wrong!" + error)
            });
    }


    if (!user) return <p> User not fund</p>;
    return (
        <div className="Profile">

            <h2>fügen Sie ein Buch ein</h2>

            <AddBuch addbuch={addBuch}/>
            <br/>
            <br/>
            <br/>
            <Divider/>

            <LessenBuecher buecher={buch} deleteBuch={deleteBuch}/>


        </div>
    )
}
