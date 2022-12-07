module.exports = (app) => {
  const acceso = require("../controllers/acceso.controller.js");

  //Estas son las rutas para el API
  //Registrar
  app.post("/acceso", acceso.create);

  //Listar
  app.get("/acceso", acceso.findAll);

  //Obtener
  app.get("/acceso/:accesoId", acceso.findOne);

  //Actualizar
  app.put("/acceso/:accesoId", acceso.update);

  //Eliminar
  app.delete("/acceso/:accesoId", acceso.delete);
};
