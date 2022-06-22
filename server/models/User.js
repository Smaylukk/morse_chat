const { Schema, model } = require("mongoose")

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 2,
      trim: true
    },
    password: {
      type: String,
      required: true,
    },
    banned: {
      type: Boolean,
      default: false,
    },
    predefined: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: [{type: String, enum: ['admin', 'user', 'newby']}],
    }
  }
);

module.exports = model("User", UserSchema);
