//Referencia al modelo
const Proyecto = require("../models/proyecto.model.js");

/**
 * Para crear un nuevo registro
 * @param {*} req Solicitud desde Web
 * @param {*} res Respuesta del proyecto creado
 * @returns JSON
 */
exports.create = (req, res) => {
  //Se valida
  if (!req.body.nombre) {
    return res.status(400).send({
      message: "El nombre del proyecto no puede ser vacío",
    });
  }

  if (!req.body.cliente) {
    return res.status(400).send({
      message: "El cliente no puede ser vacío",
    });
  }

  if (!req.body.pm) {
    return res.status(400).send({
      message: "El PM del proyecto no puede ser vacío",
    });
  }

  if (!req.body.po) {
    return res.status(400).send({
      message: "El PO del proyecto no puede ser vacío",
    });
  }

  //Se forma
  const proyecto = new Proyecto({
    nombre: req.body.nombre,
    cliente: req.body.cliente,
    contactoCliente: req.body.contactoCliente,
    pm: req.body.pm,
    po: req.body.po,
    linkGit: req.body.git,
    horasRegistradas: req.body.horasR,
    horasContratadas: req.body.horasC,
    horasFacturables: req.body.horasF,
    equipo: req.body.equipo
  });

  //Se guarda
  proyecto
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error registrando el proyecto.",
      });
    });
};

/**
 * Se obtienen todos los registros
 * @param {*} req Solicitud web
 * @param {*} res Respuesta de registros en JSON
 */
exports.findAll = (req, res) => {
  Proyecto.find()
    .then((proyectos) => {
      res.send(proyectos);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error al obtener los proyectos.",
      });
    });
};

/**
 * Se encuentra el proyecto por ID
 * @param {*} req Solicitud web
 * @param {*} res Respuesta del proyecto en JSON
 */
exports.findOne = (req, res) => {
  Proyecto.findById(req.params.proyectoId)
    .then((proyecto) => {
      if (!proyecto) {
        return res.status(404).send({
          message: "No hay proyectos con el ID " + req.params.proyectoId,
        });
      }
      res.send(proyecto); //Este si existe
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No hay proyectos con el ID " + req.params.proyectoId,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al obtener el proyecto " +
          req.params.proyectoId,
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
  if (!req.body.nombre) {
    return res.status(400).send({
      message: "El nombre del proyecto no puede ser vacío",
    });
  }

  if (!req.body.cliente) {
    return res.status(400).send({
      message: "El cliente no puede ser vacío",
    });
  }

  if (!req.body.pm) {
    return res.status(400).send({
      message: "El PM del proyecto no puede ser vacío",
    });
  }

  if (!req.body.po) {
    return res.status(400).send({
      message: "El PO del proyecto no puede ser vacío",
    });
  }

  //Encontrar el proyecto
  Proyecto.findByIdAndUpdate(
    req.params.proyectoId,
    {
      nombre: req.body.name,
      cliente: req.body.cliente,
      contactoCliente: req.body.contactoCliente,
      pm: req.body.pm,
      po: req.body.po,
      linkGit: req.body.git,
      horasRegistradas: req.body.horasR,
      horasContratadas: req.body.horasC,
      horasFacturables: req.body.horasF,
      equipo: req.body.equipo
    },
    { new: true }
  )
    .then((proyecto) => {
      if (!proyecto) {
        return res.status(404).send({
          message: "No hay proyectos con el id " + req.params.proyectoId,
        });
      }
      res.send(proyecto);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No hay proyectos con el id " + req.params.proyectoId,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al actualizar el proyecto " +
          req.params.proyectoId,
      });
    });
};

/**
 * Eliminar un proyecto
 * @param {*} req Solicitud web
 * @param {*} res Respuesta del proyecto eliminado
 */
exports.delete = (req, res) => {
  Proyecto.findByIdAndRemove(req.params.proyectoId)
    .then((proyecto) => {
      if (!proyecto) {
        return res.status(404).send({
          message: "No hay proyectos con el id" + req.params.proyectoId,
        });
      }
      res.send({ message: "El proyecto se eliminó de manera correcta!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "No hay proyectos con el id" + req.params.proyectoId,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al eliminar el proyecto " +
          req.params.proyectoId,
      });
    });
};