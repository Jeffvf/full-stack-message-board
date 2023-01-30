import express from "express";
import { 
  userCreateGet, userCreatePost, userDeleteGet,
  userDeletePost, userDetail, userList,
  userUpdateGet, userUpdatePost 
} from "../controllers/userController.js";

const router = express.Router();

router.get('/', userList);
router.get('/:id', userDetail);
router.get('/create', userCreateGet);
router.post('/create', userCreatePost);
router.get('/:id/update', userUpdateGet);
router.post('/:id/update', userUpdatePost);
router.get('/:id/delete', userDeleteGet);
router.post('/:id/delete', userDeletePost);

export default router;