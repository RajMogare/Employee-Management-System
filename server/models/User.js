import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String, // Path to the uploaded file
  },
});

const User = mongoose.model('User', userSchema);
export default User;
