import React from "react";

const CartItem = ({ cartItem }) => {
  const { name, quantity } = cartItem;

  return (
    <div style={{ color: "#000000" }}>
      <h2>{name}</h2>
      <span>{quantity}</span>
    </div>
  );
};

export default CartItem;
