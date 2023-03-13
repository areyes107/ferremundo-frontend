import React from "react";

const CartItem = ({ cartItem }) => {
  const { name, quantity, itemPic, unitPrice } = cartItem;

  return (
    <div
      style={{
        color: "#000000",
        width: "100%",
        display: "flex",
        marginBottom: "2vh",
      }}
    >
      <img
        src={itemPic}
        alt=""
        style={{ width: "30%", objectFit: "contain" }}
      />
      <div
        style={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "10px 20px",
        }}
      >
        <span style={{ fontSize: "14px" }}>{name}</span>
        <span style={{ fontSize: "14px" }}>
          {quantity} x {unitPrice}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
