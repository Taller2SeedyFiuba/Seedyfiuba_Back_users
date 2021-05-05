import { Router } from "express";
const router = Router();

import { 
    createUser,
    getUsers,
    userExists,
    getOneUser,
    deleteUser,
    updateUser
} from "../controllers/users.controller";

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

export default router;