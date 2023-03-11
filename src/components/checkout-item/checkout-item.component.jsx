import React, { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const CheckoutItem = ({ cartItem }) => {
  const { name, category, unitPrice, itemNumber, quantity, itemPic } = cartItem;
  const { addItemToCart, clearItemFromCart, removeItemToCart } =
    useContext(CartContext);

  const clearItemHandler = (cartItem) => {
    clearItemFromCart(cartItem);
  };

  const addItemHandler = (cartItem) => {
    addItemToCart(cartItem);
  };

  const removeItemHandler = (cartItem) => {
    removeItemToCart(cartItem);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        minHeight: "100px",
        borderBottom: "1px solid darkgrey",
        padding: "15px 0",
        fontSize: "15px",
        alignItems: "center",
      }}
    >
      <div style={{ width: "14%", paddingRight: "15px" }}>
        <img src={itemPic} style={{ width: "100%", height: "100%" }} alt="" />
      </div>
      <span style={{ width: "16%" }}>{name}</span>
      <span style={{ width: "14%", display: "flex" }}>
        <div
          style={{
            cursor: "pointer",
          }}
          onClick={() => removeItemHandler(cartItem)}
        >
          &#10094;
        </div>
        <span style={{ margin: "0 10px" }}> {quantity} </span>
        <div
          style={{
            cursor: "pointer",
          }}
          onClick={() => addItemHandler(cartItem)}
        >
          &#10095;
        </div>
      </span>
      <span style={{ width: "14%" }}>{unitPrice}</span>
      <span style={{ width: "14%" }}>{category} </span>
      <span style={{ width: "14%" }}>{itemNumber}</span>
      <div
        style={{ paddingLeft: "12px", cursor: "pointer", width: "14%" }}
        onClick={() => clearItemHandler(cartItem)}
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
