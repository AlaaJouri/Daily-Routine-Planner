import "./../UserData.css";
import useAuth from "../../hooks/useAuth";
import ReadingBooks from "./Books";
import AddBook from "./AddBook";
import {useEffect, useState} from "react";
import {Book} from "../../model/Book";
import axios from "axios";
import Divider from '@mui/material/Divider';
import * as React from 'react';


export default function BooksGet() {
    const {user} = useAuth(false);
    const [book, setBook] = useState<Book[]>([])


    function fetchBooks() {
        axios.get("/api/book")
            .then(response => {
                setBook(response.data);
            })
            .catch(console.error);
    }

    function deleteBook(id: string) {
        axios.delete("/api/book/" + id)
            .then(fetchBooks)
            .catch(console.error);
    }


    useEffect(() => {
        fetchBooks()
    }, [])

    function addBook(bookToAdd: Book) {
        axios.post("/api/book", bookToAdd)
            .then((response) => {
                setBook([...book, response.data])
            })
            .catch((error) => {
                console.error("I'm sorry. Something went wrong!" + error)
            });
    }


    if (!user) return <p> </p>;
    return (
        <div className="Profile">
            <h1 id="title" className="title">Books</h1>
            <p id="description" className="title">insert a book</p>
            <hr/>
            <AddBook addbuch={addBook}/>
            <br/>
            <br/>
            <br/>
            <Divider/>

            <ReadingBooks books={book} deleteBook={deleteBook}/>


        </div>
    )
}
