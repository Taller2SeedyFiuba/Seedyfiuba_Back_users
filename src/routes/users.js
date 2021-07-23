const router = require("express").Router();
const uc = require("../controllers/users");
const { hocError } = require('../errors/handler');

router.post('/', hocError(uc.createUser));
router.get('/', hocError(uc.getUsers));
router.get('/:id', hocError(uc.getOneUser));
router.patch('/:id', hocError(uc.updateUser));

module.exports = router;
