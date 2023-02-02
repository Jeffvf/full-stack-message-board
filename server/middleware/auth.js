import jwt from "jsonwebtoken";
import Message from "../models/Message.js";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("Access Denied");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyUser = (req, res, next) => {
  if(req.user.id != req.params.id){
    return res.status(403).send("Access Denied");
  }
  next();
};

export const verifyMessage = async (req, res, next) => {
  try{
    const message = await Message.findById(req.params.id, 'title text user');

    req.message = message;
  } catch(err){
    return res.status(404).send({ errors: "Mensagem não encontrada" });
  }
  next();
}

export const verifyMessageUser = (req, res, next) => {
  if(req.message.user != req.user.id){
    return res.status(403).send("Access Denied");
  }
  next();
}