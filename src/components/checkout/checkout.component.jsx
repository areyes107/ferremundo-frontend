import { Button } from "@mui/material";
import React, { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import { send } from "emailjs-com";

import CheckoutItem from "../checkout-item/checkout-item.component";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  const generateOrderSummary = async (orderItems) => {
    const orderSummary = await orderItems.reduce((summary, orderItem) => {
      return (
        `${summary} \n \n` +
        ` -Producto: ${orderItem.name} \n -Precio: ${orderItem.unitPrice} \n -Cantidad: ${orderItem.quantity} \n -Código: ${orderItem.itemNumber}`
      );
    }, "");

    return orderSummary;
  };

  const sendMessage = () => {
    generateOrderSummary(cartItems).then((message) => {
      send(
        "service_k1v53pr",
        "template_2piusco",
        { message: message },
        "vPrTcY6qR6G82xFk9"
      ).then(
        (result) => console.log(result.text),
        (error) => console.log(error.text)
      );
    });
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
          onClick={() => sendMessage()}
        >
          Terminar Pedido
        </Button>
      ) : (
        <h1>No tienes productos agregados en tu carrito</h1>
      )}
    </div>
  );
};

export default Checkout;
