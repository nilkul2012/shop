import React from 'react'
import TextField from "@mui/material/TextField";

const SimpleTextField = ({name, type, value, onchange,sx}) => {
  return (
    <TextField
          id="outlined-number"
          label={name}
          type={type}
          value={value}
          onChange={onchange}
          sx={sx}
    />
  )
}

export default SimpleTextField