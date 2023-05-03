const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "add the user name"],
    },
    email: {
      type: String,
      require: [true, "add the email"],
      unique: [true, "email address already exisited"],
    },
    password: {
      type: String,
      require: [true, "add the password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
