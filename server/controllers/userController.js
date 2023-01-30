import User from "../models/User.js";
import Message from "../models/Message.js";

export const userList = async(req, res) => {
  try {
    const user = await User.find({}, "username");

    res.status(200).json();
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

export const userCreatePost = async(req, res) => {
  res.status(404).json({ message: 'Não implementado' });
}

export const userUpdateGet = async(req, res) => {
  res.status(404).json({ message: 'Não implementado' });
}

export const userUpdatePost = async(req, res) => {
  res.status(404).json({ message: 'Não implementado' });
}

export const userDeleteGet = async(req, res) => {
  res.status(404).json({ message: 'Não implementado' });
}

export const userDeletePost = async(req, res) => {
  res.status(404).json({ message: 'Não implementado' });
}