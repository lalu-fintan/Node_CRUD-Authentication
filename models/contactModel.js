const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    // user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   require: true,
    //   ref: "user",
    // },
    name: {
      type: String,
      require: [true, "Add the contact name"],
    },
    email: {
      type: String,
      require: [true, "Add the contact email address"],
    },
    phone: {
      type: Number,
      require: [true, "Add the contact phone number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contact", contactSchema);
