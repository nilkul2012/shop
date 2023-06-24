import React from 'react'
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";

const UserName = ({ value, onchange, name, ...rest }) => {
  return (
    <TextField
      sx={rest.sx}
      id="outlined-basic"
      label={name}
      variant="outlined"
      value={value}
      onChange={onchange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default UserName