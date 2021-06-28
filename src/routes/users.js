const router = require("express").Router();
const uc = require("../controllers/users.controller");
const { hocError } = require('../errors/handler');

router.get('/', hocError(uc.getUsers));
router.post('/', hocError(uc.createUser));
router.get('/exists/:id', hocError(uc.userExists));
router.get('/:id', hocError(uc.getOneUser));
//router.delete('/:id', hocError(uc.deleteUser));
router.put('/:id', hocError(uc.updateUser));

module.exports = router;
