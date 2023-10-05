import { Schema, Document, model } from 'mongoose';
import { UserType } from '../../types/index.js';
import { UserLevel } from '../../../const.js';


export interface UserDocument extends UserType, Document {
  createdAt: Date,
  updatedAt: Date
}

const userSchema = new Schema ({
  name: String,
  email: {
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    require: true,
  },
  avatarURL: {
    type: String,
    require: true,
    minlength: [5, 'Min length for avatar path is 5']
  },
  password: {
    type: String,
    require: true,
    minlength: [6, 'Min length for password is 6']

  },
  userType: {
    type: String,
    enum: Object.values(UserLevel),
    require: true
  }
}, {timestamps: true});

export const UserModel = model<UserDocument>('User', userSchema);

