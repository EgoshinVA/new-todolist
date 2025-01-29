import React, {useState} from 'react';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

type Props = {
    addItem: (title: string) => void;
    disabled?: boolean;
}

export const AddItemForm: React.FC<Props> = ({addItem, disabled}) => {
    const [title, setTitle] = useState<string>("")

    const addItemHandler = () => {
        addItem(title)
        setTitle("")
    }

    return (
        <div>
            <TextField size={'small'} label={'Enter a title'} value={title} onChange={e => setTitle(e.currentTarget.value)} variant="outlined" />
            <Button disabled={disabled} variant='contained' onClick={addItemHandler}>+</Button>
        </div>
    )
}