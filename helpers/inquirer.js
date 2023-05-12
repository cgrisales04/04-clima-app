const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué deseas hacer?",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Buscar ciudad`,
      },
      {
        value: 2,
        name: `${"2.".green} Historial`,
      },
      {
        value: 0,
        name: `${"0.".green} Salir`,
      }
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("======================".green);
  console.log("Seleccione una opción".green);
  console.log("======================".green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pausa = async () => {
  return await inquirer.prompt([
    {
      type: "input",
      name: "salir",
      message: `Presione ${"enter".green} para continuar.`,
    },
  ]);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};


module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  confirmar,
};