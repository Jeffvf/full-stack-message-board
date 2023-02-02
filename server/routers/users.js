import express from "express";
import { verifyToken, verifyUser } from "../middleware/auth.js";
import { 
  userCreatePost, userDeletePost,
  userDetail, userList,
  userLogin, userUpdateGet, userUpdatePost 
} from "../controllers/userController.js";

const router = express.Router();

// create user
router.post('/create', userCreatePost);

// login
router.post('/login', userLogin);

// update user
router.get('/:id/update', verifyToken, verifyUser, userUpdateGet);
router.post('/:id/update', verifyToken, verifyUser, userUpdatePost);

// delete user
router.post('/:id/delete', verifyToken, verifyUser, userDeletePost);

// all users
router.get('/', userList);

// user detail
router.get('/:id', userDetail);

export default router;