import { Button, Container } from "@mui/material";
import React, { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div>
      <Container
        sx={{
          position: "absolute",
          width: "300px",
          height: "340px",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          border: "1px solid #c3c3c3",
          backgroundColor: "white",
          top: "90px",
          right: "40px",
          zIndex: 5,
          borderRadius: "12px",
        }}
      >
        <Container
          sx={{
            height: "240px",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
          }}
        >
          {cartItems.map((item) => (
            <CartItem key={item.itemNumber} cartItem={item} />
          ))}
        </Container>
        <Button variant="contained" style={{ backgroundColor: "#b53836" }}>
          Hacer Pedido
        </Button>
      </Container>
    </div>
  );
};

export default CartDropdown;
