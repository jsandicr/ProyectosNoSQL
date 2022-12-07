const mongoose = require("mongoose");

/**
 * Esta es la definición de la estructura
 */
const HorasSchema = mongoose.Schema(
  {
    idUsuario: String,
    idProyecto: String,
    fecha: Date,
    cantidadHoras: Number,
    cantidadHorasFacturables: Number
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Horas", HorasSchema);