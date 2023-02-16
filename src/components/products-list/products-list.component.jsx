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
        where("category", "==", "TRUPER")
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
      {products
        .filter(
          ({ itemNumber }) =>
            itemNumber === "TP100502" ||
            itemNumber === "TP101594" ||
            itemNumber === "TP11004" ||
            itemNumber === "TP12114" ||
            itemNumber === "TP12407" ||
            itemNumber === "TP12408" ||
            itemNumber === "TP12409" ||
            itemNumber === "TP12482" ||
            itemNumber === "TP13027" ||
            itemNumber === "TP13028" ||
            itemNumber === "TP13029" ||
            itemNumber === "TP13594" ||
            itemNumber === "TP14013" ||
            itemNumber === "TP14635" ||
            itemNumber === "TP14658" ||
            itemNumber === "TP14659" ||
            itemNumber === "TP15006" ||
            itemNumber === "TP15007" ||
            itemNumber === "TP15656" ||
            itemNumber === "TP15657" ||
            itemNumber === "TP15679" ||
            itemNumber === "TP16683" ||
            itemNumber === "TP16684" ||
            itemNumber === "TP19360"
        )
        .map(({ itemPic, name, itemsItemId, unitPrice, category }) => {
          return (
            <Paper style={{ borderRadius: "12px" }}>
              <img
                src={itemPic}
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
