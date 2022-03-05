import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const userSchema =  new mongoose.Schema({

firstName: {type: String, required: false, default: '#empty for now#'},

lastName: {type: String, required: false, default: '#empty for now#'},

pseudoName: {type: String, required: false, default: '#empty for now#'},

pwwd: {type: String, required: true},

emaill: {type: String, required: true}

})



export interface User {

firstName: string,
lastName: string,
pseudoName: string,
pwwd: string,
emaill: string

};

userSchema.pre('save',  async function(next) {
    try {
      if (!this.isModified('pwwd')) {
        return next();
      }
      const hashed =  await bcrypt.hash(this['pwwd'], 12);
      this['pwwd'] = hashed;
      return next();
    } catch (err) {
      return next(err);
    }
});



export interface UserModelDef extends User, mongoose.Document { }