import { Box } from "@mui/material";
import React from "react";
import Bomba from "../../assets/img/bomba_agua.jpeg";
import CategoryItem from "../../category-item/category-item.component";
import Soldadora from "../../assets/img/soldadora.jpeg";
import Compresor from "../../assets/img/compresor.jpeg";
import Toolcraft from "../../assets/img/toolcraft.png";
import Truper from "../../assets/img/truper.jpeg";

export function Home() {
  const categories = [
    {
      id: 1,
      title: "Compresores",
      img: Compresor,
      redirectUrl: "/productos?f=name&q=Compresor",
    },
    {
      id: 2,
      title: "Soldadoras",
      img: Soldadora,
      redirectUrl: "/productos?f=name&q=Soldador",
    },
    {
      id: 3,
      title: "Bombas de Agua",
      img: Bomba,
      redirectUrl: "/productos?f=name&q=Bomba",
    },

    {
      id: 4,
      title: "Truper",
      img: Truper,
      redirectUrl: "/productos?f=category&q=Truper",
    },
    {
      id: 5,
      title: "Toolcraft",
      img: Toolcraft,
      redirectUrl: "/productos?f=category&q=Toolcraft",
    },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: "2vh",
      }}
    >
      {categories.map((category) => {
        return <CategoryItem category={category} />;
      })}
    </Box>
  );
}
