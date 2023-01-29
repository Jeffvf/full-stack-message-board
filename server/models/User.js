import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true, maxLength: 35 },
  lastName: { type: String, required: true, maxLength: 35 },
  username: { type: String, required: true },
  password: { type: String, required: true },
  member: { type: Boolean, default: false }
});

UserSchema.virtual('url').get(function() {
  return `/user/${this._id}`;
})

const User = mongoose.model('User', UserSchema);
export default User;