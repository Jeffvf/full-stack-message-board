import Message from "../models/Message";

export const recentMessages = async(req, res) => {
  try {
    const messages = await 
    Message.find()
    .sort({ updatedAt: -1, createdAt: -1 })
    .populate('user')
    .limit(10)

    res.status(200).json(messages);
  } catch(err) {
    res.status(404).json({ message: err.message });
  }
}

export const messageDetails = async(req, res) => {
  try {
    const message = await 
    Message.findById(req.params.id)
    .populate('user');

    res.status(200).json(message);
  } catch(err) {
    res.status(404).json({ message: err.message });
  }
}

export const messageCreateGet = async(req, res) => {
  res.status(404).json({ message: 'Não implementado' });
}

export const messageCreatePost = async(req, res) => {
  res.status(404).json({ message: 'Não implementado' });
}

export const messageUpdateGet = async(req, res) => {
  res.status(404).json({ message: 'Não implementado' });
}

export const messageUpdatePost = async(req, res) => {
  res.status(404).json({ message: 'Não implementado' });
}

export const messageDeleteGet = async(req, res) => {
  res.status(404).json({ message: 'Não implementado' });
}

export const messageDeletePost = async(req, res) => {
  res.status(404).json({ message: 'Não implementado' });
}