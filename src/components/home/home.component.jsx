import React from "react";
import qrCode from "../../assets/img/frame.png";

export function Home() {
  return (
    <div style={{ margin: "2vh", textAlign: "center" }}>
      <div>
        <p> Estamos trabajando para darte un mejor servicio </p>
        <p>Mientras puedes solicitar tus productos vía Facebook </p>

        <img
          src={qrCode}
          alt=""
          style={{ marginLeft: "auto", marginRight: "auto", display: "block" }}
        />
        <a href="https://www.facebook.com/people/Ferremundo/100090276001449/">
          Puedes escanear el código QR o haz click aquí para ir a nuestro
          Facebook
        </a>
      </div>
    </div>
  );
}
