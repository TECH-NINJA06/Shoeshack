const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: { 
      type: String, 
      required: true 
    },
    products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }]
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

userSchema.methods.generateAccessToken = function () {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  return jwt.sign({ userId: this._id }, accessTokenSecret, {
    expiresIn: "1d",
  });
};

userSchema.methods.generateRefreshToken = function () {
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
  return jwt.sign({ userId: this._id }, refreshTokenSecret, {
    expiresIn: "7d",
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
