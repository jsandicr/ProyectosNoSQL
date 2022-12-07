module.exports = (app) => {
  const framework = require("../controllers/framework.controller.js");

  //Estas son las rutas para el API
  //Registrar
  app.post("/framework", framework.create);

  //Listar
  app.get("/framework", framework.findAll);

  //Obtener
  app.get("/framework/:frameworkId", framework.findOne);

  //Actualizar
  app.put("/framework/:frameworkId", framework.update);

  //Eliminar
  app.delete("/framework/:frameworkId", framework.delete);
};
