//Referencia al modelo
const Horas = require("../models/horas.model.js");

/**
 * Para crear un nuevo registro
 * @param {*} req Solicitud desde Web
 * @param {*} res Respuesta del horas creado
 * @returns JSON
 */
exports.create = (req, res) => {
  //Se valida
  if (!req.body.idUsuario) {
    return res.status(400).send({
      message: "El id usuario no puede ser vacío",
    });
  }

  if (!req.body.idProyecto) {
    return res.status(400).send({
      message: "El id proyecto no puede ser vacío",
    });
  }

  if (!req.body.cantidadHoras) {
    return res.status(400).send({
      message: "La cantidad de horas no puede ser vacío",
    });
  }

  if (!req.body.cantidadHorasFacturables) {
    return res.status(400).send({
      message: "La cantidad de horas facturables no puede ser vacío",
    });
  }

  //Se forma
  const horas = new Horas({
    idUsuario: req.body.idUsuario,
    idProyecto: req.body.idProyecto,
    fecha: new Date(),
    cantidadHoras: req.body.cantidadHoras,
    cantidadHorasFacturables: req.body.cantidadHorasFacturables
  });

  //Se guarda
  horas
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error registrando el horas.",
      });
    });
};

/**
 * Se obtienen todos los registros
 * @param {*} req Solicitud web
 * @param {*} res Respuesta de registros en JSON
 */
exports.findAll = (req, res) => {
  Horas.find()
    .then((horas) => {
      res.send(horas);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error al obtener las horas.",
      });
    });
};

/**
 * Se encuentra el horas por ID
 * @param {*} req Solicitud web
 * @param {*} res Respuesta del horas en JSON
 */
exports.findOne = (req, res) => {
  Horas.findById(req.params.horaId)
    .then((horas) => {
      if (!horas) {
        return res.status(404).send({
          message: "No hay horas con el ID " + req.params.horaId,
        });
      }
      res.send(horas); //Este si existe
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No hay horas con el ID " + req.params.horaId,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al obtener las horas " +
          req.params.horaId,
      });
    });
};

/**
 * Actualiza un registro
 * @param {*} req Solicitud web
 * @param {*} res Respuesta del registro actualizado
 * @returns JSON
 */
exports.update = (req, res) => {
  // Valida
  if (!req.body.idUsuario) {
    return res.status(400).send({
      message: "El id usuario no puede ser vacío",
    });
  }

  if (!req.body.idProyecto) {
    return res.status(400).send({
      message: "El id proyecto no puede ser vacío",
    });
  }

  if (!req.body.cantidadHoras) {
    return res.status(400).send({
      message: "La cantidad de horas no puede ser vacío",
    });
  }

  if (!req.body.cantidadHorasFacturables) {
    return res.status(400).send({
      message: "La cantidad de horas facturables no puede ser vacío",
    });
  }

  //Encontrar el usuario
  Horas.findByIdAndUpdate(
    req.params.horaId,
    {
      idUsuario: req.body.idUsuario,
      idProyecto: req.body.idProyecto,
      cantidadHoras: req.body.cantidadHoras,
      cantidadHorasFacturables: req.body.cantidadHorasFacturables
    },
    { new: true }
  )
    .then((horas) => {
      if (!horas) {
        return res.status(404).send({
          message: "No hay horas con el id " + req.params.horaId,
        });
      }
      res.send(horas);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No hay horas con el id " + req.params.horaId,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al actualizar el horas " +
          req.params.horaId,
      });
    });
};

/**
 * Eliminar un horas
 * @param {*} req Solicitud web
 * @param {*} res Respuesta del horas eliminado
 */
exports.delete = (req, res) => {
  Horas.findByIdAndRemove(req.params.horaId)
    .then((horas) => {
      if (!horas) {
        return res.status(404).send({
          message: "No hay horas con el id" + req.params.horaId,
        });
      }
      res.send({ message: "El horas se eliminó de manera correcta!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "No hay horas con el id" + req.params.horaId,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al eliminar el horas " +
          req.params.horaId,
      });
    });
};