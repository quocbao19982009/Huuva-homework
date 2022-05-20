import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const SelectInput = () => {
  const [option, setOption] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as string);
    console.log(option);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={option}
        label="Sort By"
        onChange={handleChange}
      >
        <MenuItem value={10}>All</MenuItem>
        <MenuItem value={20}>Waiting for chef</MenuItem>
        <MenuItem value={30}>Ready to pickup</MenuItem>
        <MenuItem value={30}>Being prepare</MenuItem>
        <MenuItem value={30}>Pause</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectInput;
