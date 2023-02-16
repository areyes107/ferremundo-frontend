import { Button, Paper } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase.util";

const UseProductsData = () => {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const q = query(
        collection(db, "products-inventory"),
        where("itemPic", "!=", null)
      );
      const snapshot = await getDocs(q);
      const listProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      listProducts.sort((a, b) => a.itemsItemId - b.itemsItemId);
      setProductsData(listProducts);
    };
    getProducts();
  }, []);
  return [productsData, setProductsData];
};

export default function ProductsList() {
  // eslint-disable-next-line
  const [products, setProducts] = UseProductsData();
  return (
    <div
      style={{
        padding: "2vw",
        display: "grid",
        gridGap: "15px",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      }}
    >
      {products.map(({ itemPic, name, itemsItemId, unitPrice, category }) => {
        return (
          <Paper style={{ borderRadius: "12px" }}>
            <img
              src={
                itemPic !== null
                  ? itemPic
                  : "https://firebasestorage.googleapis.com/v0/b/ferremundo-6bfb3.appspot.com/o/pictures%2Fnot_available.png?alt=media&token=1700e622-60a2-46f9-8d79-25503b071de2"
              }
              alt=" "
              style={{
                width: "100%",
                borderRadius: "8px",
              }}
            />
            <div
              style={{
                marginBottom: "0.5em",
                padding: "16px",
                backgroundColor: "#ffffff",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h5
                style={{
                  textTransform: "uppercase",
                  fontSize: "1.5em",
                  fontWeight: "bold",
                }}
              >
                {name}
              </h5>
              <h6
                style={{
                  textTransform: "uppercase",
                  fontSize: "1em",
                }}
              >
                {category}
              </h6>
              <p style={{ color: "#777" }}>{unitPrice}</p>
              <Button
                style={{
                  backgroundColor: "#b53836",
                  borderRadius: "12px",
                }}
                variant="contained"
              >
                Agregar al Carrito
              </Button>
            </div>
          </Paper>
        );
      })}
    </div>
  );
}
