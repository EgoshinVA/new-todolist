import React, {useState} from 'react';
import {TextField} from "@mui/material";

type Props = {
    title: string
    onChange: (title: string) => void
    disabled?: boolean
}

export const EditableSpan: React.FC<Props> = ({title, disabled, onChange}) => {
    const [value, setValue] = useState<string>(title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const changeTitle = () => {
        if (!disabled) {
            setEditMode(false)
            onChange(value)
        }
    }

    return (
        <div>
            {editMode ? <TextField value={value}
                                   onChange={e => setValue(e.currentTarget.value)}
                                   variant="outlined"
                                   onBlur={changeTitle}
                /> :
                <span onDoubleClick={() => setEditMode(true)}>{title}</span>}
        </div>
    )
}