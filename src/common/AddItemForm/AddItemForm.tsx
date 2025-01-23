import React, {useState} from 'react';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

type Props = {
    addItem: (title: string) => void;
}

export const AddItemForm: React.FC<Props> = ({addItem}) => {
    const [title, setTitle] = useState<string>("")

    const addItemHandler = () => {
        addItem(title)
    }

    return (
        <div>
            <TextField value={title} onChange={e => setTitle(e.currentTarget.value)} variant="outlined" />
            <Button variant='contained' onClick={addItemHandler}>+</Button>
        </div>
    )
}