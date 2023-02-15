import User from "../models/User.js";
import Message from "../models/Message.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const userList = async(req, res) => {
  try {
    const user = await User.find({}, "username");

    res.status(200).json(user);
  } catch(err) {
    res.status(404).json({ errors: err.message});
  }
}

export const userDetail = async(req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const messages = await Message.find({ user: req.params.id });

    res.status(200).json({ user: user, messages: messages });
  } catch(err) {
    res.status(404).json({ errors: err.message });
  }
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
      return res.status(400).json({ errors: err.message });
    }

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: passwordHash
    });

    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array(), user});
    }
    if(userExists !== null){
      return res.status(400).json({ errors: 'Nome de usuário já utilizado', user });
    }
    user.save((err) => {
      if(err){
        return res.status(400).json({ errors: err.message, user });
      }
      res.sendStatus(200)
    })
  }
];

export const userUpdateGet = async(req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password");
    if(!user){
      return res.status(404).json({ errors: 'Usuário não encontrado' });
    }
    res.status(200).json({ user: user });
  } catch(err) {
    res.status(404).json({ errors: err.message });
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

    if(req.body.password) {
      try {
        salt = await bcrypt.genSalt();
        passwordHash = await bcrypt.hash(req.body.password, salt);
        userExists = await User.findOne({ username: req.body.username })
        user['password'] = passwordHash 
      } catch(err) {
        return res.status(400).json({ errors: err.message });
      }
    }
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array(), user });
    }
    const userId = JSON.stringify(user._id)
    if(userExists !== null && JSON.stringify(userExists._id) !== userId){
      return res.status(400).json({ errors: 'Nome de usuário já utilizado', user });
    }
    User.findByIdAndUpdate(req.params.id, user, {}, (err, doc) => {
      if(err){
        return res.status(400).json({ errors: err })
      }
      res.status(200).json(user)
    });
  }
];

export const userLogin = async(req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if(user === null ) return res.status(400).json({ errors: 'Nome de usuário incorreto'});

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if(!isMatch) return res.status(400).json({ errors: 'Senha incorreta'});

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token, user });
  } catch(err) {
    res.status(500).json({ errors: err.message });
  }
}

export const userDeletePost = [
  body('password', 'Senha invalida')
  .trim()
  .isLength({ min: 8 })
  .escape(),
  body('confirmPassword', 'Campos de senha devem ser iguais')
  .custom((value, { req }) => value === req.body.password),
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    try{
      const user = await User.findById(req.params.id, 'password');
      if(!user){
        return res.status(404).json({ errors: 'Usuário não encontrado' });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if(!isMatch) return res.status(400).json({ errors: 'Senha incorreta'});

      await Message.deleteMany({ user: req.params.id });
      await User.findByIdAndDelete(req.params.id);
      res.sendStatus(200)
    } catch(err) {
      res.status(400).json({ errors: err.message });
    }
  }
]
