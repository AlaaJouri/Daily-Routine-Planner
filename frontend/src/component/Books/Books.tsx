import {Book} from "../../model/Book";
import ReadingBook from "./NewBook";
import useAuth from "../../hooks/useAuth";
import Layout from "./../Layout";
import * as React from "react";

type BuecherProps = {

    books: Book[]
    deleteBook: (id: string) => void


}

export default function Books (props: BuecherProps) {
    const user = useAuth(true);


    const buecher = props.books
        .map((buecher) => {
            return (
                <ReadingBook buch={buecher} key={buecher.id} deleteBuch={props.deleteBook} />
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
