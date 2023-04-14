import {Buch} from "../model/Buch";
import LessenBuch from "./LessenBuch";
import useAuth from "../hooks/useAuth";
import Layout from "./Layout";
import * as React from "react";

type BuecherProps = {

    buecher: Buch[]
    deleteBook: (id: string) => void

}

export default function LessenBuecher (props: BuecherProps) {
    const user = useAuth(true);


    const buecher = props.buecher
        .map((buecher) => {
            return (
                <LessenBuch buch={buecher} key={buecher.id} deleteBuch={props.deleteBook} />
            )
        })

    return (
        <Layout>
            {!user ? <p>Loading...</p> : (
                <div>
                    {buecher}

                </div>
            )}
        </Layout>
    )
}
