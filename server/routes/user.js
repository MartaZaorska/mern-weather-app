import express from 'express';
import authMiddleware from '../middleware/auth.js';

import {
  signInUser,
  signUpUser,
  signOutUser,
  getUser, 
  updateUser,
  deleteUser
} from '../controllers/user.js';

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.post("/signout", signOutUser);

router
  .route("/profile")
  .get(authMiddleware, getUser)
  .put(authMiddleware, updateUser)
  .delete(authMiddleware, deleteUser);


export default router;