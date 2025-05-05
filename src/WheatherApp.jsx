import React, { useState } from "react";

export const WheatherApp = () => {
  // "https://api.openweathermap.org/data/3.0/onecall"
  // https://api.openweathermap.org/data/2.5/onecall
  const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "7a5b5b554cf84329b89ca51d36516887";

  const [ciudad, setCiudad] = useState("");
  const [dataClima, setDataClima] = useState(null);

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad.trim().length > 0) {
      fetchClima(); // No se le pasa ningún argumento
    }
  };

  const fetchClima = async () => {
    try {
      // https://www.weatherapi.com/confirm.aspx?code=f6558b5b-c2d1-4c96-9b4e-ff995c6289a9
      const climaRes = await fetch(
        `${WEATHER_URL}?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`
      );

      const climaData = await climaRes.json();
      if (climaData.cod !== 200) {
        alert("Ciudad no encontrada");
        return;
      }
      setDataClima(climaData);
    } catch (error) {
      console.log("Ocurrió el siguiente error:", error);
    }
  };

  return (
    <div className="container">
      <h1>App Clima</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ciudad}
          onChange={handleCambioCiudad}
          placeholder="Escribe una ciudad"
        />
        <button type="submit">Buscar</button>
      </form>

      {dataClima && (
        <div className="weather-info">
          <h2>{dataClima.name}</h2>
          <h3>Temperatura actual: {dataClima.main.temp}°C</h3>
          <p>Descripción: {dataClima.weather[0].description}</p>
          <p>Sensación térmica: {dataClima.main.feels_like}°C</p>
          <p>Humedad: {dataClima.main.humidity}%</p>
          <p>Viento: {dataClima.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2k.png`}
            alt="Icono del clima"
          />
        </div>
      )}
    </div>
  );
};
