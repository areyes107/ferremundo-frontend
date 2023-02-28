import { Button, Paper } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { db } from "../../firebase/firebase.util";

const UseProductsData = (id) => {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const docRef = doc(db, "products-inventory", id);
      const snapshot = await getDoc(docRef);
      const listProducts = { id: snapshot.id, ...snapshot.data() };
      setProductsData(listProducts);
    };
    getProducts();
    // eslint-disable-next-line
  }, []);
  return [productsData, setProductsData];
};

export default function ProductDetails() {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  // eslint-disable-next-line
  const [product, setProduct] = UseProductsData(id);
  const { itemPic, name, unitPrice, category } = product;

  useEffect(() => {}, []);

  return (
    <div style={{ padding: "2vh" }}>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "1000px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
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
          </div>
          <div
            style={{
              marginBottom: "0.5em",
              padding: "16px",
              backgroundColor: "#ffffff",
              textAlign: "left",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
            }}
          >
            <h5
              style={{
                textTransform: "uppercase",
                fontSize: "1.5em",
                fontWeight: "bold",
                borderBottom: "1px solid #abb8c3",
                marginBlockEnd: 0,
              }}
            >
              {name}
            </h5>

            <h5
              style={{
                textTransform: "uppercase",
                fontSize: "1.5em",
                fontWeight: "bold",
                color: "#b53836",
                marginBlockEnd: 0,
                marginBlockStart: 0,
              }}
            >
              {unitPrice}
            </h5>
            <h6
              style={{
                textTransform: "uppercase",
                fontSize: "1em",
              }}
            >
              {category}
            </h6>
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
        </div>
      </div>
    </div>
  );
}
