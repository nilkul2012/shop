import React, {useState} from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const DropDowns = ({name}) => {
    const [type, setType] = useState("");
    const dropdownValues = [
        { name: "Admin", value: "ADMIN" },
        { name: "User", value: "USER" },
        { name: "Guest", value: "GUEST" },
      ];
    
      const handleChange = (data) => {
        setType(data);
      };
  return (
    <>
      <InputLabel id="demo-simple-select-label">{name}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={type.name}
        label={name}
      >
        {dropdownValues.map((data, i) => (
          <MenuItem
            onClick={() => handleChange(data)}
            value={data.value}
            key={i}
          >
            {data.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default DropDowns;
