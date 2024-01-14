import express from 'express';
import authMiddleware from "../middleware/auth.js";

import {
  addLocation,
  deleteLocation
} from '../controllers/location.js';

const router = express.Router();

router.use(authMiddleware);

router.post("/", addLocation);
router.delete("/:id", deleteLocation);

export default router;
