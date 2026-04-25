const mongoose = require('mongoose');
<<<<<<< HEAD
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

  personType: {
    type: String,
    enum: ['user', 'doctor', 'recovered', 'admin'],
    default: 'user'
  },

  name: {
    type: String,
    required: true
  },

  phone: {
    type: String
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  avatar: {
    type: String,
    default: null
  }

}, { timestamps: true });


// 🔐 تشفير الباسورد قبل الحفظ
userSchema.pre('save', async function (next) {

  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});


// 🔍 مقارنة الباسورد
userSchema.methods.matchPassword = async function (enteredPassword) {

  return await bcrypt.compare(enteredPassword, this.password);

};

module.exports = mongoose.model('User', userSchema);
=======
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  personType: { type: String, enum: ['user', 'doctor', 'recovered'], default: 'user' },
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: null }
}, { timestamps: true });

// هاش الباسورد قبل الحفظ
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// دالة التحقق من الباسورد
UserSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
>>>>>>> 6bd4bb9 (initial commit)
