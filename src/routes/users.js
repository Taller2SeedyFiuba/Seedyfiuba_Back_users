const router = require("express").Router();

const { 
    createUser,
    getUsers,
    userExists,
    getOneUser,
    deleteUser,
    updateUser
} = require("../controllers/users.controller");

const use = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// /api/users/

router.post('/', use(createUser));
router.get('/', use(getUsers));

// /api/users/:userID

router.get('/exists/:id', use(userExists));
router.get('/:id', use(getOneUser));
router.delete('/:id', use(deleteUser));
router.put('/:id', use(updateUser));

module.exports = router;
