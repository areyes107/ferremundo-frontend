import { Box } from "@mui/material";
import React from "react";
import Bomba from "../../assets/img/bomba_agua.png";
import Soldadora from "../../assets/img/soldadora.png";
import Compresor from "../../assets/img/compresor.png";
import Toolcraft from "../../assets/img/toolcraft.png";
import Truper from "../../assets/img/truper.png";
import CategoryItem from "../category-item/category-item.component";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <h1>Categorías y Marcas Destacadas</h1>
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
          return <CategoryItem key={category.id} category={category} />;
        })}
      </Box>
    </div>
  );
}
