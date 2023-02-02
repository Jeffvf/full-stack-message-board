import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { 
  messageCreateGet, messageCreatePost, messageDeleteGet,
   messageDeletePost, messageDetails, messageUpdateGet,
   messageUpdatePost, recentMessages 
} from "../controllers/messageController.js";

const router = express.Router();


// create message
router.get('/message/create', verifyToken, messageCreateGet);
router.post('/message/create', verifyToken, messageCreatePost);

// update messsage
router.get('/message/:id/update', verifyToken, messageUpdateGet);
router.post('/message/:id/update', verifyToken, messageUpdatePost);

// delete message
router.get('/message/:id/delete', verifyToken, messageDeleteGet);
router.post('/message/:id/delete', verifyToken, messageDeletePost);

// recent messages
router.get('/', recentMessages);

// message details
router.get('/message/:id', messageDetails);

export default router;