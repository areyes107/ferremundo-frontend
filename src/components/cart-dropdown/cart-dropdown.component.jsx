import { Button, Container } from "@mui/material";
import React, { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart.context";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  const history = useNavigate();
  const { cartItems, setIsCartOpen } = useContext(CartContext);

  const goToCheckout = () => {
    history("/checkout");
    setIsCartOpen(false);
  };
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
        {cartItems.length !== 0 ? (
          <Fragment>
            <Container
              sx={{
                height: "240px",
                display: "flex",
                flexDirection: "column",
                overflow: "scroll",
              }}
            >
              {cartItems.map((item) => (
                <Fragment>
                  {cartItems.length !== 0 && (
                    <CartItem key={item.itemNumber} cartItem={item} />
                  )}
                </Fragment>
              ))}
            </Container>
            <Button
              variant="contained"
              style={{ backgroundColor: "#b53836" }}
              onClick={() => goToCheckout()}
            >
              Realizar Pedido
            </Button>
          </Fragment>
        ) : (
          <div style={{ color: "black" }}>
            No hay productos agregados en tu carrito
          </div>
        )}
      </Container>
    </div>
  );
};

export default CartDropdown;
