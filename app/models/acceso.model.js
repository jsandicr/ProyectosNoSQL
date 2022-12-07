const mongoose = require("mongoose");

/**
 * Esta es la definición de la estructura
 */
const AccesoSchema = mongoose.Schema(
  {
    url: String,
    usuario: String,
    contrasenna: String,
    puerto: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Acceso", AccesoSchema);