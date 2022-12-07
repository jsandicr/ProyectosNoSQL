//Referencia al modelo
const Usuario = require("../models/usuario.model.js");

/**
 * Para crear un nuevo registro
 * @param {*} req Solicitud desde Web
 * @param {*} res Respuesta del usuario creado
 * @returns JSON
 */
exports.create = (req, res) => {
  //Se valida
  if (!req.body.nombre) {
    return res.status(400).send({
      message: "El nombre del usuario no puede ser vacío",
    });
  }

  if (!req.body.usuario) {
    return res.status(400).send({
      message: "El nombre de usuario no puede ser vacío",
    });
  }

  if (!req.body.rol) {
    return res.status(400).send({
      message: "El rol del usuario no puede ser vacío",
    });
  }

  //Se forma
  const usuario = new Usuario({
    nombre: req.body.nombre,
    usuario: req.body.usuario,
    rol: req.body.rol,
    proyectos: req.body.proyectos
  });

  //Se guarda
  usuario
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error registrando el usuario.",
      });
    });
};

/**
 * Se obtienen todos los registros
 * @param {*} req Solicitud web
 * @param {*} res Respuesta de registros en JSON
 */
exports.findAll = (req, res) => {
  Usuario.find()
    .then((usuarios) => {
      res.send(usuarios);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error al obtener los usuarios.",
      });
    });
};

/**
 * Se encuentra el usuario por ID
 * @param {*} req Solicitud web
 * @param {*} res Respuesta del usuario en JSON
 */
exports.findOne = (req, res) => {
  Usuario.findById(req.params.usuarioId)
    .then((usuario) => {
      if (!usuario) {
        return res.status(404).send({
          message: "No hay usuarios con el ID " + req.params.usuarioId,
        });
      }
      res.send(usuario); //Este si existe
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No hay usuarios con el ID " + req.params.usuarioId,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al obtener el usuario " +
          req.params.usuarioId,
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
      message: "El nombre del usuario no puede ser vacío",
    });
  }

  if (!req.body.usuario) {
    return res.status(400).send({
      message: "El nombre de usuario no puede ser vacío",
    });
  }

  if (!req.body.rol) {
    return res.status(400).send({
      message: "El rol del usuario no puede ser vacío",
    });
  }

  //Encontrar el usuario
  Usuario.findByIdAndUpdate(
    req.params.usuarioId,
    {
      nombre: req.body.nombre,
      usuario: req.body.usuario,
      rol: req.body.rol,
      proyectos: req.body.proyectos
    },
    { new: true }
  )
    .then((usuario) => {
      if (!usuario) {
        return res.status(404).send({
          message: "No hay usuarios con el id " + req.params.usuarioId,
        });
      }
      res.send(usuario);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No hay usuarios con el id " + req.params.usuarioId,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al actualizar el usuario " +
          req.params.usuarioId,
      });
    });
};

/**
 * Eliminar un usuario
 * @param {*} req Solicitud web
 * @param {*} res Respuesta del usuario eliminado
 */
exports.delete = (req, res) => {
  Usuario.findByIdAndRemove(req.params.usuarioId)
    .then((usuario) => {
      if (!usuario) {
        return res.status(404).send({
          message: "No hay usuarios con el id" + req.params.usuarioId,
        });
      }
      res.send({ message: "El usuario se eliminó de manera correcta!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "No hay usuarios con el id" + req.params.usuarioId,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al eliminar el usuario " +
          req.params.usuarioId,
      });
    });
};