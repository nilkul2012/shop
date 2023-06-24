import React from 'react'
import Button from "@mui/material/Button";

const Btn = ({name, sx, onclick}) => {
  return (
    <Button
          className="reg-btn"
          sx={sx}
          variant="contained"
          onClick={onclick}
    >
        {name}
    </Button>
  )
}

export default Btn