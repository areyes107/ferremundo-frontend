import { Box, Button, TextField } from "@mui/material";
import { send } from "emailjs-com";
import React, { useContext, useState } from "react";
import { CartContext } from "../../context/cart.context";

const FinalCheckout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [direction, setDirection] = useState("");
  const [town, setTown] = useState("");
  const [state, setState] = useState("");

  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;
    setPhoneNumber(value);
  };

  const handleDirectionChange = (event) => {
    const { value } = event.target;
    setDirection(value);
  };

  const handleTownChange = (event) => {
    const { value } = event.target;
    setTown(value);
  };

  const handleStateChange = (event) => {
    const { value } = event.target;
    setState(value);
  };

  const generateOrderSummary = async (orderItems) => {
    const orderSummary = await orderItems.reduce((summary, orderItem) => {
      return (
        `${summary} \n \n` +
        ` -Producto: ${orderItem.name} \n -Precio: ${orderItem.unitPrice} \n -Cantidad: ${orderItem.quantity} \n -Código: ${orderItem.itemNumber} \n -Marca: ${orderItem.category}`
      );
    }, "");

    return orderSummary;
  };

  const sendMessage = () => {
    generateOrderSummary(cartItems).then((message) => {
      send(
        "service_k1v53pr",
        "template_2piusco",
        {
          message: message,
          name: name,
          email: email,
          phone_number: phoneNumber,
          direction: direction,
          state: state,
          town: town,
          total: cartTotal + 45,
        },
        "vPrTcY6qR6G82xFk9"
      ).then(
        (result) => console.log(result.text),
        (error) => console.log(error.text)
      );
    });
    alert(
      "Tu pedido ha sido ingresado correctamente, te estaremos llamando pronto para confirmar datos"
    );
  };

  return (
    <div
      style={{
        padding: "2vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        Por favor ingrese sus datos para poder realizar el envío correspondiente
      </h2>

      <Box>
        <TextField
          sx={{ paddingBottom: "10px" }}
          variant="outlined"
          fullWidth
          size="medium"
          required
          label="Nombre"
          onChange={handleNameChange}
          value={name}
          name="name"
          type="text"
          autoFocus
        />
        <TextField
          sx={{ paddingBottom: "10px" }}
          variant="outlined"
          fullWidth
          size="medium"
          required
          label="Correo"
          onChange={handleEmailChange}
          value={email}
          name="email"
          type="email"
        />
        <TextField
          sx={{ paddingBottom: "10px" }}
          variant="outlined"
          fullWidth
          size="medium"
          required
          label="Número de teléfono"
          onChange={handlePhoneNumberChange}
          value={phoneNumber}
          name="phoneNumber"
          type="tel"
        />
        <TextField
          sx={{ paddingBottom: "10px" }}
          variant="outlined"
          fullWidth
          size="medium"
          required
          label="Dirección"
          onChange={handleDirectionChange}
          value={direction}
          name="direction"
          type="text"
        />
        <TextField
          sx={{ paddingBottom: "10px" }}
          variant="outlined"
          fullWidth
          size="medium"
          required
          label="Municipio"
          onChange={handleTownChange}
          value={town}
          name="town"
          type="text"
        />
        <TextField
          sx={{ paddingBottom: "10px" }}
          variant="outlined"
          fullWidth
          size="medium"
          required
          label="Departamento"
          onChange={handleStateChange}
          value={state}
          name="state"
          type="text"
        />
      </Box>
      <h2 style={{ textAlign: "center" }}>
        El total a facturar es de Q{cartTotal + 45}
      </h2>
      <Button
        style={{ backgroundColor: "#b53836" }}
        variant="contained"
        onClick={() => sendMessage()}
      >
        Confirmar Pedido
      </Button>
    </div>
  );
};

export default FinalCheckout;
