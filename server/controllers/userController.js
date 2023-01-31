import User from "../models/User.js";
import Message from "../models/Message.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

export const userList = async(req, res) => {
  try {
    const user = await User.find({}, "username");

    res.status(200).json(user);
  } catch(err) {
    res.status(404).json({ message: err.message});
  }
}

export const userDetail = async(req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const messages = await Message.find({ user: req.params.id });

    res.status(200).json({ user: user, messages: messages });
  } catch(err) {
    res.status(404).json({ message: err.message });
  }
}

export const userCreateGet = async(req, res) => {
  res.status(404).json({ message: 'Não implementado' });
}

export const userCreatePost = [
  body('firstName', 'Campo nome não deve ser vazio')
  .trim()
  .isLength({ min:2 })
  .escape(),
  body('lastName', 'Campo sobrenome não deve ser vazio')
  .trim()
  .isLength({ min:2 })
  .escape(),
  body('username', 'Email inválido')
  .normalizeEmail()
  .isEmail()
  .escape(),
  body('password', 'Campo senha deve possuir ao menos 8 caracteres')
  .trim()
  .isLength({ min:8 })
  .escape(),
  body('confirmPassword', 'Campos de senha devem ser iguais')
  .custom((value, { req }) => value === req.body.password),
  async (req, res) => {
    const errors = validationResult(req);
    let salt, passwordHash, userExists;

    try {
      salt = await bcrypt.genSalt();
      passwordHash = await bcrypt.hash(req.body.password, salt);
      userExists = await User.findOne({ username: req.body.username })
    } catch(err) {
      res.status(400).json({ errors: err });
    }

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: passwordHash
    });

    if(!errors.isEmpty()){
      res.status(400).json({ errors: errors.array(), user});
    }
    if(userExists !== null){
      res.status(400).json({ errors: 'Nome de usuário já utilizado', user });
    }
    user.save((err) => {
      if(err){
        res.status(400).json({ errors: err, user });
      }
      res.status(200).json(user);
    })
  }
];

export const userUpdateGet = async(req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password");
    res.status(200).json({ user: user });
  } catch(err) {
    res.status(404).json({ message: err.message });
  }
}

export const userUpdatePost = [
  body('firstName', 'Campo nome não deve ser vazio')
  .trim()
  .isLength({ min:2 })
  .escape(),
  body('lastName', 'Campo sobrenome não deve ser vazio')
  .trim()
  .isLength({ min:2 })
  .escape(),
  body('username', 'Email inválido')
  .normalizeEmail()
  .isEmail()
  .escape(),
  body('password', 'Campo senha deve possuir ao menos 8 caracteres')
  .optional({ checkFalsy: true })
  .trim()
  .isLength({ min:8 })
  .escape(),
  body('confirmPassword', 'Campos de senha devem ser iguais')
  .custom((value, { req }) => value === req.body.password),
  async (req, res) => {
    const errors = validationResult(req);
    let salt, passwordHash, userExists;
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      _id: req.params.id
    });

    if(!errors.isEmpty()){
      res.status(400).json({ errors: errors.array(), user });
    }
    if(req.body.password) {
      try {
        salt = await bcrypt.genSalt();
        passwordHash = await bcrypt.hash(req.body.password, salt);
        userExists = await User.findOne({ username: req.body.username })
        user['password'] = passwordHash 
      } catch(err) {
        res.status(400).json({ errors: err });
      }
    }
    User.findByIdAndUpdate(req.params.id, user, {}, (err, doc) => {
      if(err){
        res.status(400).json({ message: err })
      }
      res.redirect(doc.url)
    });
  }
];

export const userDeleteGet = async(req, res) => {
  res.status(404).json({ message: 'Não implementado' });
}

export const userDeletePost = async(req, res) => {
  res.status(404).json({ message: 'Não implementado' });
}