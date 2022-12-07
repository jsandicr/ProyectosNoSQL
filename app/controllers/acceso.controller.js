//Referencia al modelo
const Acceso = require("../models/acceso.model.js");

/**
 * Para crear un nuevo registro
 * @param {*} req Solicitud desde Web
 * @param {*} res Respuesta del acceso creado
 * @returns JSON
 */
exports.create = (req, res) => {
  //Se valida
  if (!req.body.url) {
    return res.status(400).send({
      message: "La url no puede ser vacío",
    });
  }

  if (!req.body.usuario) {
    return res.status(400).send({
      message: "El usuario no puede ser vacío",
    });
  }

  if (!req.body.contrasenna) {
    return res.status(400).send({
      message: "El contrasenna no puede ser vacía",
    });
  }

  if (!req.body.puerto) {
    return res.status(400).send({
      message: "El puerto no puede ser vacío",
    });
  }

  //Se forma
  const acceso = new Acceso({
    url: req.body.url,
    usuario: req.body.usuario,
    contrasenna: req.body.contrasenna,
    puerto: req.body.puerto
  });

  //Se guarda
  acceso
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error registrando el acceso.",
      });
    });
};

/**
 * Se obtienen todos los registros
 * @param {*} req Solicitud web
 * @param {*} res Respuesta de registros en JSON
 */
exports.findAll = (req, res) => {
  Acceso.find()
    .then((accesos) => {
      res.send(accesos);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error al obtener los accesos.",
      });
    });
};

/**
 * Se encuentra el acceso por ID
 * @param {*} req Solicitud web
 * @param {*} res Respuesta del acceso en JSON
 */
exports.findOne = (req, res) => {
  Acceso.findById(req.params.accesoId)
    .then((acceso) => {
      if (!acceso) {
        return res.status(404).send({
          message: "No hay accesos con el ID " + req.params.accesoId,
        });
      }
      res.send(acceso); //Este si existe
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No hay accesos con el ID " + req.params.accesoId,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al obtener el acceso " +
          req.params.accesoId,
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
  if (!req.body.url) {
    return res.status(400).send({
      message: "La url no puede ser vacío",
    });
  }

  if (!req.body.usuario) {
    return res.status(400).send({
      message: "El usuario no puede ser vacío",
    });
  }

  if (!req.body.contrasenna) {
    return res.status(400).send({
      message: "El contrasenna no puede ser vacía",
    });
  }

  if (!req.body.puerto) {
    return res.status(400).send({
      message: "El puerto no puede ser vacío",
    });
  }

  //Encontrar el acceso
  Acceso.findByIdAndUpdate(
    req.params.accesoId,
    {
      url: req.body.url,
      usuario: req.body.usuario,
      contrasenna: req.body.contrasenna,
      puerto: req.body.puerto
    },
    { new: true }
  )
    .then((acceso) => {
      if (!acceso) {
        return res.status(404).send({
          message: "No hay acceso con el id " + req.params.accesoId,
        });
      }
      res.send(acceso);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No hay accesos con el id " + req.params.accesoId,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al actualizar el acceso " +
          req.params.accesoId,
      });
    });
};

/**
 * Eliminar un acceso
 * @param {*} req Solicitud web
 * @param {*} res Respuesta del acceso eliminado
 */
exports.delete = (req, res) => {
  Acceso.findByIdAndRemove(req.params.accesoId)
    .then((acceso) => {
      if (!acceso) {
        return res.status(404).send({
          message: "No hay accesos con el id" + req.params.accesoId,
        });
      }
      res.send({ message: "El acceso se eliminó de manera correcta!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "No hay accesos con el id" + req.params.accesoId,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al eliminar el acceso " +
          req.params.accesoId,
      });
    });
};