module.exports = (app) => {
  const proyecto = require("../controllers/proyecto.controller.js");

  //Estas son las rutas para el API
  //Registrar
  app.post("/proyecto", proyecto.create);

  //Listar
  app.get("/proyecto", proyecto.findAll);

  //Obtener
  app.get("/proyecto/:proyectoId", proyecto.findOne);

  //Actualizar
  app.put("/proyecto/:proyectoId", proyecto.update);

  //Eliminar
  app.delete("/proyecto/:proyectoId", proyecto.delete);
};
