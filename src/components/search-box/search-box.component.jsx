import { InputBase } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { alpha, styled } from "@mui/material/styles";
import React from "react";
import "./search-box.styles.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 26,
  backgroundColor: alpha("#000000", 0.05),
  "&:hover": {
    backgroundColor: alpha("#000000", 0.1),
  },

  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchBox = ({ setParentInput, value, isDisabled, onChange }) => {
  const handleChange = (e) => {
    setParentInput(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Search
      style={{
        display: "flex",
        alignItems: "center",
        width: 300,
        marginBottom: "2vh",
        borderRadius: "26px",
      }}
    >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Buscar..."
        type="search"
        value={value}
        onChange={handleChange}
        disabled={isDisabled}
        autoFocus
        color="error"
      ></StyledInputBase>
    </Search>
  );
};

export default SearchBox;
