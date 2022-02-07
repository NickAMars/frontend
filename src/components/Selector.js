import React, { useState, useEffect } from "react";
import * as axios from "axios";
import { getColors } from "../helpers";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Selector(props) {
  const [select, setSelect] = useState("");
  const [colors, setColors] = useState([]);
  // execute once
  useEffect(() => {
    // call axios request with available parameters
    axios.get(`http://localhost:8080/api/1.0.0/groups`).then((result) => {
      if (result?.data) {
        const collect = getColors(result.data.colors);
        setColors(collect);
      }
    });
  }, []);
  const handleChange = (event) => {
    setSelect(event.target.value);
  };
  return (
    <Box sx={{ width: "fit-content" }}>
      <FormControl sx={{ width: 250, height: 37 }}>
        <InputLabel id="select-color">Colors</InputLabel>
        <Select
          labelId="select-color"
          value={select}
          label="group"
          onChange={handleChange}
        >
          {colors.length !== 0 ? (
            colors.map((color, i) => (
              <MenuItem
                key={i}
                value={color}
                onClick={() => props.getColor(color)}
              >
                {color}
              </MenuItem>
            ))
          ) : (
            <MenuItem value={""} />
          )}
        </Select>
      </FormControl>
    </Box>
  );
}

export default Selector;
