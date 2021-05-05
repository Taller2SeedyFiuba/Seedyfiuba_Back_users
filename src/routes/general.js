import { Router } from "express";
const router = Router();

import { 
    getDatabaseStatus
} from "../controllers/general.controller";

const use = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// /api/general/status

router.get('/status', use(getDatabaseStatus));

export default router;