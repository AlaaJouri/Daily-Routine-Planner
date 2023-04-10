import {Buch} from "../model/Buch";
import {Link} from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';

import FormGroup from '@mui/material/FormGroup';

import * as React from 'react';
import { pink } from '@mui/material/colors';


type BuchProps = {
    buch: Buch
    deleteBuch: (id: string) => void
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function LessenBuch(props: BuchProps) {


    function handleDelete() {
        props.deleteBuch(props.buch.id)
    }


    return (
        <Stack direction="row" spacing={1}>
            <FormControlLabel
                label={props.buch.title}
                control={<Checkbox  sx={{
                    color: pink[100],
                    '&.Mui-checked': {
                        color: pink[100],
                    },
                }}/>}
            />






            <IconButton onClick={handleDelete}  aria-label="delete">
                <DeleteIcon />
            </IconButton>

            <IconButton  className={"buch-update"}><Link className={"link-header"} to={"/book/update/"+ props.buch.id}><EditIcon /> </Link></IconButton>

        </Stack>


    )
}