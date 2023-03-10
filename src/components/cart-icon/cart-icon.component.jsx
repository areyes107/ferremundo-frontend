import { ShoppingBagOutlined } from "@mui/icons-material";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";

import { CartContext } from "../../context/cart.context";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
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
              width: "50px",
              height: "50px",
            }}
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <ShoppingBagOutlined
              alt="Carrito"
              style={{ color: "#FFFFFF", width: "29px", height: "29px" }}
            />
            <span
              style={{
                position: "absolute",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: "bold",
                bottom: "14px",
              }}
            >
              0
            </span>
          </IconButton>
        </Tooltip>
      </Box>
    </div>
  );
};

export default CartIcon;
