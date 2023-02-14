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
    <div style={{ padding: "2vw", display: "flex" }}>
      {products
        .filter(
          ({ itemNumber }) =>
            itemNumber === "TP15006" ||
            itemNumber === "TP15007" ||
            itemNumber === "TP15656" ||
            itemNumber === "TP15657" ||
            itemNumber === "TP19360"
        )
        .map(({ itemPic, name, itemNumber, itemsItemId, unitPrice }) => {
          return (
            <Paper
              style={{
                maxWidth: "350px",
                paddingTop: 24,
                paddingBottom: 24,
                paddingRight: 24,
                margin: "1vh",
              }}
            >
              <ul
                key={itemsItemId}
                style={{
                  listStyle: "none",
                }}
              >
                <li>
                  <img
                    src={itemPic}
                    alt=" "
                    style={{ width: "10vw", marginLeft: "2vw" }}
                  />
                </li>
                <li style={{ textAlign: "center" }}>
                  <b> {name} </b>
                </li>
                <li style={{ textAlign: "center" }}>{unitPrice}</li>
                <li style={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    style={{ borderRadius: "12px", backgroundColor: "#b53836" }}
                  >
                    Agregar al Carrito
                  </Button>
                </li>
              </ul>
            </Paper>
          );
        })}
    </div>
  );
}
