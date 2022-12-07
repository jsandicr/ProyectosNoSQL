const mongoose = require("mongoose");

/**
 * Esta es la definición de la estructura
 */
const ProyectoSchema = mongoose.Schema(
  {
    nombre: String,
    cliente: String,
    contactoCliente: [{
      nombre: String,
      email: String,
      rol: String
    }],
    pm: String,
    po: String,
    linkGit: String,
    horasRegistradas: Number,
    horasContratadas: Number,
    horasFacturables: Number,
    equipo: [{
      idUsuario: String 
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Proyecto", ProyectoSchema);