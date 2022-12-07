module.exports = (app) => {
  const horas = require("../controllers/horas.controller.js");

  //Estas son las rutas para el API
  //Registrar
  app.post("/horas", horas.create);

  //Listar
  app.get("/horas", horas.findAll);

  //Obtener
  app.get("/horas/:horaId", horas.findOne);

  //Actualizar
  app.put("/horas/:horaId", horas.update);

  //Eliminar
  app.delete("/horas/:horaId", horas.delete);
};
