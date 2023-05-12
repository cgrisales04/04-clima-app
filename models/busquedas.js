const axios = require("axios");

class Busquedas {
  historial = [""];

  constructor() {
    //TODO: Leer DB si existe
  }

  async ciudad(lugar = "") {
    try {
      const rep = await axios.get("https://reqres.in/api/users?page=2");
      console.log(rep.data);
      return [];
    } catch (error) {
      return [];
    }
  }
}

module.exports = Busquedas;
