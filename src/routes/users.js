const router = require("express").Router();
const uc = require("../controllers/users");
const { hocError } = require('../errors/handler');

router.post('/', hocError(uc.createUser));
router.get('/', hocError(uc.getUsers));
router.get('/exists/:id', hocError(uc.userExists));
router.get('/:id', hocError(uc.getOneUser));
router.patch('/:id', hocError(uc.updateUser));
//router.delete('/:id', hocError(uc.deleteUser));

module.exports = router;
