import { Button, Container } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CartContext } from "../../context/cart.context";
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

  const { addItemToCart } = useContext(CartContext);

  // eslint-disable-next-line
  const [product, setProduct] = UseProductsData(id);
  const { itemPic, name, unitPrice, category, description, itemNumber } =
    product;

  const addProductToCart = (product) => {
    addItemToCart(product);
  };

  useEffect(() => {}, []);

  return (
    <Container sx={{ padding: "2vh", backgroundColor: "#ffffff" }}>
      <Container
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "1500px",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Container sx={{ width: { sx: "100%", md: "50%" } }}>
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
          </Container>
          <Container
            sx={{
              marginBottom: "0.5em",
              padding: "16px",
              backgroundColor: "#ffffff",
              textAlign: "left",
              justifyContent: "center",
              alignItems: "center",
              width: { sx: "100%", md: "50%" },
            }}
          >
            <h5
              style={{
                textTransform: "uppercase",
                fontSize: "1.5em",
                fontWeight: "bold",
                borderBottom: "1px solid #e1e1e1",
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
            <p>{description} </p>
            <h6
              style={{
                textTransform: "uppercase",
                fontSize: "1em",
                marginBlockEnd: 0,
                marginBlockStart: 0,
              }}
            >
              {category}
            </h6>
            <p style={{ fontSize: 11, marginBlockStart: 0 }}>
              <b> Código: </b>
              {itemNumber && itemNumber.substring(2)}
            </p>
            <Button
              style={{
                backgroundColor: "#b53836",
                borderRadius: "12px",
              }}
              variant="contained"
              onClick={() =>
                addProductToCart({
                  itemPic,
                  name,
                  category,
                  id,
                  unitPrice,
                  itemNumber,
                })
              }
            >
              Agregar al Carrito
            </Button>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
