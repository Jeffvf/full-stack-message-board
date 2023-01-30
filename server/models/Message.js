import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, maxLength: 40 },
  text: { type: String, required: true, maxLength: 300 },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

MessageSchema.virtual('url').get(function() {
  return `/users/${this.user}/message/${this._id}`;
})

const Message = mongoose.model('Message', MessageSchema);
export default Message;