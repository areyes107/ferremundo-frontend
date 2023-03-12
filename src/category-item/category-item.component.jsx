import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryItem = ({ category }) => {
  const history = useNavigate();
  const { img, title, redirectUrl } = category;

  const goToRedirect = (url) => {
    history(url);
  };
  return (
    <Paper
      onClick={() => goToRedirect(redirectUrl)}
      sx={{
        minWidth: "30%",
        height: "240px",
        flex: "1 1 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 7.5px 15px",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${img})`,
          "&:hover": {
            transform: "scale(1.1)",
            transition: "transform 1s cubic-bezier(0.25, 0.45, 0.45, 0.95)",
          },
        }}
      />

      {title !== "Toolcraft" && title !== "Truper" && (
        <Box
          sx={{
            height: "90px",
            padding: "0 25px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid black",
            backgroundColor: "white",
            opacity: "0.7",
            position: "absolute",
            "&:hover": {
              opacity: "0.9",
            },
          }}
        >
          <h2
            sx={{
              fontWeight: "bold",
              margin: "0 6px 0",
              fontSize: "22px",
              color: "#4a4a4a",
            }}
          >
            {title}
          </h2>
        </Box>
      )}
    </Paper>
  );
};

export default CategoryItem;
