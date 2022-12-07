module.exports = (app) => {
  const usuario = require("../controllers/usuario.controller.js");

  //Estas son las rutas para el API
  //Registrar
  app.post("/usuario", usuario.create);

  //Listar
  app.get("/usuario", usuario.findAll);

  //Obtener
  app.get("/usuario/:usuarioId", usuario.findOne);

  //Actualizar
  app.put("/usuario/:usuarioId", usuario.update);

  //Eliminar
  app.delete("/usuario/:usuarioId", usuario.delete);
};
