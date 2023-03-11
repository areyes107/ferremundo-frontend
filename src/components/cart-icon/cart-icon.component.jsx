import { ShoppingBagOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";

import { CartContext } from "../../context/cart.context";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  return (
    <div>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Carrito de Compras">
          <IconButton
            sx={{
              p: 0,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "55px",
              height: "55px",
            }}
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <ShoppingBagOutlined
              alt="Carrito"
              style={{ color: "#FFFFFF", width: "34px", height: "34px" }}
            />
            <span
              style={{
                position: "absolute",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: "bold",
                bottom: "16px",
              }}
            >
              {cartCount}
            </span>
          </IconButton>
        </Tooltip>
      </Box>
    </div>
  );
};

export default CartIcon;
