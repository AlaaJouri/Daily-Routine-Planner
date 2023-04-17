import {Book} from "../model/Book";
import LessenBuch from "./LessenBuch";
import useAuth from "../hooks/useAuth";
import Layout from "./Layout";
import * as React from "react";
import {FormEvent} from "react";

type BuecherProps = {

    books: Book[]
    deleteBook: (id: string) => void


}

export default function LessenBuecher (props: BuecherProps) {
    const user = useAuth(true);


    const buecher = props.books
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
