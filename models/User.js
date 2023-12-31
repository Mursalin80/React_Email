const mongoose = require("mongoose");
const { Schema } = mongoose;

const user = new Schema({
  googleId: String,
  displayName: String,

  credits: { type: Number, default: 0 },
});

mongoose.model("users", user);
