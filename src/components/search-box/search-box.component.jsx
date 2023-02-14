import { InputBase, Paper } from "@mui/material";
import { Search } from "@mui/icons-material";
import React from "react";
import "./search-box.styles.css";

const SearchBox = ({ setParentInput, value, isDisabled, onChange }) => {
  const handleChange = (e) => {
    setParentInput(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Paper
      style={{
        display: "flex",
        alignItems: "center",
        width: 300,
        marginBottom: "2vh",
        borderRadius: "12px",
      }}
    >
      <InputBase
        style={{ marginLeft: "1vw", flex: 1 }}
        placeholder="Buscar"
        type="search"
        value={value}
        onChange={handleChange}
        disabled={isDisabled}
        autoFocus
      ></InputBase>
      <Search style={{ padding: 1.5 }} />
    </Paper>
  );
};

export default SearchBox;
