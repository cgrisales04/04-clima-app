const axios = require("axios");

class Busquedas {
  historial = [""];

  constructor() {
    //TODO: Leer DB si existe
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      language: "es",
      limit: 5,
    };
  }

  get paramsWeather() {
    return {
      appid: process.env.OPEN_WEATHER_KEY,
      lang: "es",
    };
  }

  async ciudad(lugar = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });
      const rep = await instance.get();

      return rep.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async clima(lat = "", lon = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsWeather, lat, lon },
      });
      const rep = await instance.get();

      const { temp_max, temp_min } = rep.data.main;
      const descripcion_clima = rep.data.weather[0]?.description;

      return {
        temp_max,
        temp_min,
        descripcion_clima,
      };
    } catch (error) {
      return {};
    }
  }
}

module.exports = Busquedas;
