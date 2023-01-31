import express from "express";
import { 
  messageCreateGet, messageCreatePost, messageDeleteGet,
   messageDeletePost, messageDetails, messageUpdateGet,
   messageUpdatePost, recentMessages 
} from "../controllers/messageController";

const router = express.Router();

// recent messages
router.get('/', recentMessages);

// message details
router.get('/message/:id', messageDetails);

// create message
router.get('/message/create', messageCreateGet);
router.post('/message/create', messageCreatePost);

// update messsage
router.get('/message/:id/update', messageUpdateGet);
router.post('/message/:id/update', messageUpdatePost);

// delete message
router.get('/message/:id/delete', messageDeleteGet);
router.post('/message/:id/delete', messageDeletePost);

export default router;