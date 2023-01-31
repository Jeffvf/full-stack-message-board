import express from "express";
import { 
  userCreateGet, userCreatePost, userDeleteGet,
  userDeletePost, userDetail, userList,
  userUpdateGet, userUpdatePost 
} from "../controllers/userController.js";

const router = express.Router();

// create user
router.get('/create', userCreateGet);
router.post('/create', userCreatePost);

// update user
router.get('/:id/update', userUpdateGet);
router.post('/:id/update', userUpdatePost);

// delete user
router.get('/:id/delete', userDeleteGet);
router.post('/:id/delete', userDeletePost);

// all users
router.get('/', userList);

// user detail
router.get('/:id', userDetail);

export default router;