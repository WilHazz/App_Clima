import React, { useState } from "react";

const [ciudad, setCiudad] = useState();
const [dataClima, setDataClima] = useState(null);

const handleCambioCiudad = (e) => {
  setCiudad(e.Target.value);
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (ciudad.length > 0) fetchClima();
};

const fetchClima = async () => {
  try {
    const response = await fetch(`${urlBase}`);
  } catch (error) {}
};

export const WheatherApp = () => {
  return (
    <>
      <div className="container">
        <h1>App para el Clima</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={ciudad} onChange={handleCambioCiudad} />
          <button type="submit">Buscar</button>
        </form>
      </div>
    </>
  );
};
