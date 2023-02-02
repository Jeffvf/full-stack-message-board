import Message from "../models/Message.js";
import User from "../models/User.js";
import { body, validationResult } from "express-validator"; 

export const recentMessages = async(req, res) => {
  try {
    const messages = await 
    Message.find()
    .sort({ updatedAt: -1, createdAt: -1 })
    .populate('user')
    .limit(10)

    res.status(200).json(messages);
  } catch(err) {
    res.status(404).json({ errors: err.message });
  }
}

export const messageDetails = async(req, res) => {
  try {
    const message = await 
    Message.findById(req.params.id)
    .populate('user');

    res.status(200).json(message);
  } catch(err) {
    res.status(404).json({ errors: err.message });
  }
}

export const messageCreateGet = async(req, res) => {
  res.status(404).json({ errors: 'Não implementado' });
}

export const messageCreatePost = [
  body('title', 'Título não deve ser vazio')
  .trim()
  .isLength({ min: 1})
  .escape(),
  body('text', 'Texto da mensagem não deve ser vazio')
  .trim()
  .isLength({ min: 1})
  .escape(),
  async (req, res) => {
    const errors = validationResult(req);
    const user = await User.findById(req.user.id);
    if(!user){
      res.status(400).json({ errors: 'Usuário inválido' });
    }
    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      user: req.user.id
    });

    if(!errors.isEmpty()){
      res.status(400).json({ errors: errors.array(), message: message });
    }
    message.save((err) => {
      if(err){
        res.status(400).json({ errors: err});
      }
      res.status(200).redirect(message.url);
    });
  }
]

export const messageUpdateGet = async(req, res) => {
  res.status(200).json({ message: req.message });
}

export const messageUpdatePost = [
  body('title', 'Título não deve ser vazio')
  .trim()
  .isLength({ min: 1})
  .escape(),
  body('text', 'Texto da mensagem não deve ser vazio')
  .trim()
  .isLength({ min: 1})
  .escape(),
  async (req, res) => {
    const errors = validationResult(req);
    const user = await User.findById(req.user.id);
    if(!user){
      res.status(400).json({ errors: 'Usuário inválido' });
    }
    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      user: req.user.id,
      _id: req.params.id
    });

    if(!errors.isEmpty()){
      res.status(400).json({ errors: errors.array(), message: message });
    }
    try{
      await Message.findByIdAndUpdate(req.params.id, message);
      res.status(200).redirect(message.url);
    } catch(err){
      res.status(400).json({ errors: err.message });
    }
  }
]

export const messageDeleteGet = async(req, res) => {
  res.status(404).json({ errors: 'Não implementado' });
}

export const messageDeletePost = async(req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id)
    res.status(200).redirect('/');
  } catch (err) {
    res.status(400).json({ errors: err.message });
  }
}