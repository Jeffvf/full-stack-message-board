import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { 
  userCreateGet, userCreatePost, userDeleteGet,
  userDeletePost, userDetail, userList,
  userLogin, userUpdateGet, userUpdatePost 
} from "../controllers/userController.js";

const router = express.Router();

// create user
router.get('/create', userCreateGet);
router.post('/create', userCreatePost);

// login
router.post('/login', userLogin);

// update user
router.get('/:id/update', verifyToken, userUpdateGet);
router.post('/:id/update', verifyToken, userUpdatePost);

// delete user
router.get('/:id/delete', verifyToken, userDeleteGet);
router.post('/:id/delete', verifyToken, userDeletePost);

// all users
router.get('/', userList);

// user detail
router.get('/:id', userDetail);

export default router;