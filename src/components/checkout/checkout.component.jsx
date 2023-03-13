import { Button } from "@mui/material";
import React, { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import CheckoutItem from "../checkout-item/checkout-item.component";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const history = useNavigate();
  const { cartItems, cartTotal } = useContext(CartContext);

  const goToFinalCheckout = () => {
    history("/finalCheckout");
  };

  return (
    <div
      style={{
        width: "95%",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "50px auto 0",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "10px 0",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid darkgrey",
        }}
      >
        <div style={{ textTransform: "capitalize", width: "14%" }}>Imagen</div>
        <div style={{ textTransform: "capitalize", width: "16%" }}>
          Producto
        </div>
        <div style={{ textTransform: "capitalize", width: "14%" }}>
          Cantidad
        </div>
        <div style={{ textTransform: "capitalize", width: "14%" }}>Precio</div>
        <div style={{ textTransform: "capitalize", width: "14%" }}>Marca</div>
        <div style={{ textTransform: "capitalize", width: "14%" }}>Código</div>
        <div style={{ textTransform: "capitalize", width: "14%" }}>
          Eliminar
        </div>
      </div>
      {cartItems.map((cartItem) => {
        return <CheckoutItem cartItem={cartItem} />;
      })}
      <span
        style={{ marginTop: "30px", marginLeft: "auto", fontSize: " 36px" }}
      >
        Total: Q{cartTotal}
      </span>
      {cartItems.length !== 0 ? (
        <Button
          style={{ backgroundColor: "#b53836" }}
          variant="contained"
          onClick={() => goToFinalCheckout(cartItems)}
        >
          Datos para envío
        </Button>
      ) : (
        <h1>No tienes productos agregados en tu carrito</h1>
      )}
    </div>
  );
};

export default Checkout;
