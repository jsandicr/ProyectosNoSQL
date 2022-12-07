//Referencia al modelo
const Framework = require("../models/framework.model.js");

/**
 * Para crear un nuevo registro
 * @param {*} req Solicitud desde Web
 * @param {*} res Respuesta del framework creado
 * @returns JSON
 */
exports.create = (req, res) => {
  //Se valida
  if (!req.body.nombre) {
    return res.status(400).send({
      message: "El nombre no puede ser vacío",
    });
  }

  if (!req.body.version) {
    return res.status(400).send({
      message: "La version no puede ser vacío",
    });
  }

  //Se forma
  const framework = new Framework({
    nombre: req.body.nombre,
    version: req.body.version,
    internoExterno: req.body.internoExterno,
    urlDescarga: req.body.urlDescarga,
    estado: req.body.estado,
    notas: req.body.notas,
    licencias: req.body.licencias
  });

  //Se guarda
  framework
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error registrando el framework.",
      });
    });
};

/**
 * Se obtienen todos los registros
 * @param {*} req Solicitud web
 * @param {*} res Respuesta de registros en JSON
 */
exports.findAll = (req, res) => {
  Framework.find()
    .then((frameworks) => {
      res.send(frameworks);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error al obtener los frameworks.",
      });
    });
};

/**
 * Se encuentra el framework por ID
 * @param {*} req Solicitud web
 * @param {*} res Respuesta del framework en JSON
 */
exports.findOne = (req, res) => {
  Framework.findById(req.params.frameworkId)
    .then((framework) => {
      if (!framework) {
        return res.status(404).send({
          message: "No hay frameworks con el ID " + req.params.frameworkId,
        });
      }
      res.send(framework); //Este si existe
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No hay frameworks con el ID " + req.params.frameworkId,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al obtener el framework " +
          req.params.frameworkId,
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
      message: "El nombre no puede ser vacío",
    });
  }

  if (!req.body.version) {
    return res.status(400).send({
      message: "La version no puede ser vacío",
    });
  }

  //Encontrar el framework
  Framework.findByIdAndUpdate(
    req.params.frameworkId,
    {
      nombre: req.body.nombre,
      version: req.body.version,
      internoExterno: req.body.internoExterno,
      urlDescarga: req.body.urlDescarga,
      estado: req.body.estado,
      notas: req.body.notas,
      licencias: req.body.licencias
    },
    { new: true }
  )
    .then((framework) => {
      if (!framework) {
        return res.status(404).send({
          message: "No hay framework con el id " + req.params.frameworkId,
        });
      }
      res.send(framework);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No hay frameworks con el id " + req.params.frameworkId,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al actualizar el framework " +
          req.params.frameworkId,
      });
    });
};

/**
 * Eliminar un framework
 * @param {*} req Solicitud web
 * @param {*} res Respuesta del framework eliminado
 */
exports.delete = (req, res) => {
  Framework.findByIdAndRemove(req.params.frameworkId)
    .then((framework) => {
      if (!framework) {
        return res.status(404).send({
          message: "No hay frameworks con el id" + req.params.frameworkId,
        });
      }
      res.send({ message: "El framework se eliminó de manera correcta!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "No hay frameworks con el id" + req.params.frameworkId,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al eliminar el framework " +
          req.params.frameworkId,
      });
    });
};