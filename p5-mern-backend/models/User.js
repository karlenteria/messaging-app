import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: String,
    email:     String,
    password:  String,
    contactNumber:  String,
});

export default mongoose.model('users', UserSchema)