const mongoose = require("mongoose");

/**
 * Esta es la definición de la estructura
 */
const FrameworkSchema = mongoose.Schema(
  {
    nombre: String,
    version: String,
    internoExterno: String,
    urlDescarga: String,
    estado: String,
    notas: [{
      nota: String
    }],
    licencias: [{
      usuario: String,
      contrasenna: String,
      codigo: String,
      libreOcupado: String,
      usuarioTiene: String
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Framework", FrameworkSchema);