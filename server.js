//Este es un servidor de aplicaciones
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Aquí se lee la configuración de la base de datos
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//Esta es la conexión a la base de datos
mongoose
  .connect(dbConfig.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Conectado de manera correcta :)");
  })
  .catch((err) => {
    console.log("No se logró conectar a la base de datos. Saliendo...", err);
    process.exit();
  });

//Aquí se define la ruta principal del servidor de API
app.get("/", (req, res) => {
  res.json({
    message:
      "Bienvenido a la aplicación de API para MongoDB. Utilice Postman para interactuar.",
  });
});

//Aquí se agregan rutas secundarias
require("./app/routes/proyecto.routes.js")(app);
require("./app/routes/acceso.routes.js")(app);
require("./app/routes/framework.routes.js")(app);
require("./app/routes/usuario.routes.js")(app);
require("./app/routes/horas.routes.js")(app);

//Aquí se escucha por solicitudes
app.listen(3000, () => {
  console.log("El servidor está disponible en el puerto 3000");
});