import {Book} from "../model/Book";
import {Link} from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';

import * as React from 'react';
import {pink} from '@mui/material/colors';
import {FormEvent} from "react";
import axios from "axios";

type BuchProps = {
    buch: Book
    deleteBuch: (id: string) => void

}

const label = {inputProps: {'aria-label': 'Checkbox demo'}};
export default function LessenBuch(props: BuchProps) {


    function handleDelete() {
        props.deleteBuch(props.buch.id)
    }

    const [isChecked, setIsChecked] = React.useState<boolean>(props.buch.isChecked);

    function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
        setIsChecked(event.target.checked);
        const updatedBuch = {...props.buch, isChecked: event.target.checked};
        axios(`/api/book/${props.buch.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(updatedBuch)
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Failed to update book');
                }
            })
            .catch(error => {
                console.error(error);
                setIsChecked(props.buch.isChecked); // Revert to the original value
            });
    }

    return (

        <Stack direction="row" spacing={1}>

            <FormControlLabel
                label={props.buch.title}
                control={<Checkbox checked={isChecked}
                                   onChange={handleCheckboxChange} sx={{
                    color: pink[100],
                    '&.Mui-checked': {
                        color: pink[100],
                    },
                }}/>}
            />


            <IconButton onClick={handleDelete} aria-label="delete">
                <DeleteIcon/>
            </IconButton>

            <IconButton className={"buch-update"}><Link className={"link-header"}
                                                        to={"/book/update/" + props.buch.id}><EditIcon/>
            </Link></IconButton>

        </Stack>


    )


}