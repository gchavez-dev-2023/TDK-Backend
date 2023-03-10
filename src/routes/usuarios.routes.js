const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/usuarios.controller");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  validateNotExistUserByMail,
  validateExistUserById,
  validateNotExistUserByRut,
  validateRoleRankUserActions,
} = require("../middlewares/validar-existe-modelo");
//CRUD
// create - read - update - delete

router.get("/", [validarJWT, validateRoleRankUserActions], getUsers);

router.post(
  "/",
  [
    validarJWT,
    validateRoleRankUserActions,
    check("email", "El email es obligatorio.").isEmail(),
    check("password", "El password es obligatorio.").not().isEmpty(),
    check("rut", "El rut es obligatorio.").not().isEmpty(),
    check("nombres", "El nombre es obligatorio.").not().isEmpty(),
    check("apellidos", "El apellido es obligatorio.").not().isEmpty(),
    validarCampos,
    validateNotExistUserByMail,
    validateNotExistUserByRut,
  ],
  createUser
);

router.get("/:id", [validarJWT, validateRoleRankUserActions], getUser);

router.put(
  "/:id",
  [
    validarJWT,
    check("email", "El email es obligatorio.").isEmail(),
    check("rut", "El rut es obligatorio.").not().isEmpty(),
    check("nombres", "El nombre es obligatorio.").not().isEmpty(),
    check("apellidos", "El apellido es obligatorio.").not().isEmpty(),
    validarCampos,
    validateExistUserById,
    validateRoleRankUserActions,
    validateNotExistUserByMail,
    validateNotExistUserByRut,
  ],
  updateUser
);

router.delete(
  "/:id",
  [validarJWT, validateExistUserById, validateRoleRankUserActions],
  deleteUser
);

module.exports = router;
