require("dotenv").config();

const {
  pausa,
  inquirerMenu,
  leerInput,
  listarLugares,
} = require("./helpers/inquirer.js");
const Busquedas = require("./models/busquedas.js");

const main = async () => {
  const busquedas = new Busquedas();
  let opt = "";

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        const termino = await leerInput("Ciudad: ");

        const lugares = await busquedas.ciudad(termino);

        const idSeleccionado = await listarLugares(lugares);
        const { id, nombre, lng, lat } = lugares.find(
          (lugar) => lugar.id === idSeleccionado
        );

        const { descripcion_clima, temp_max, temp_min } = await busquedas.clima(
          lat,
          lng
        );
        
        console.clear();
        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad: ", nombre);
        console.log("Lat: ", lat);
        console.log("Lng: ", lng);
        console.log("Temperatura: ", descripcion_clima);
        console.log("Mínima: ", temp_max);
        console.log("Máxima: ", temp_min);

        break;

      case 2:
        console.log("Opcion ", opt);
        break;

      default:
        break;
    }
    if (opt !== 0) await pausa();
  } while (opt !== 0);
};
main();
