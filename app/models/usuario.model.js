const mongoose = require("mongoose");

/**
 * Esta es la definición de la estructura
 */
const UsuarioSchema = mongoose.Schema(
  {
    nombre: String,
    usuario: String,
    rol: String,
    proyectos: [{
      idProyecto: String 
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Usuario", UsuarioSchema);