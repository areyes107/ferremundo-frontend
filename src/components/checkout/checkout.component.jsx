import { Button } from "@mui/material";
import React, { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import { send } from "emailjs-com";

const Checkout = () => {
  const { cartItems } = useContext(CartContext);

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
    <div>
      <div style={{ paddingLeft: "2vw" }}>
        {cartItems.map(
          ({ name, category, unitPrice, itemNumber, quantity, itemPic }) => {
            return (
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  paddingBottom: "1vh",
                }}
              >
                <li>
                  <img src={itemPic} alt="" style={{ width: "150px" }} />
                </li>
                <li>{name}</li>
                <li>Código: {itemNumber}</li>
                <li>Precio: {unitPrice}</li>
                <li>Marca: {category}</li>
                <li>Cantidad:{quantity}</li>
              </ul>
            );
          }
        )}
        {cartItems.length !== 0 ? (
          <Button
            style={{ backgroundColor: "#b53836" }}
            variant="contained"
            onClick={() => sendMessage()}
          >
            Realizar Pedido
          </Button>
        ) : (
          <h1>No tienes productos agregados en tu carrito</h1>
        )}
      </div>
    </div>
  );
};

export default Checkout;
