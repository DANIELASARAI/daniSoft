const mongoose = requie("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
      default: "Employee", //As an array indicates that an user can have more than one role
    },
  ],
  active: {
    type: Boolean,
    default: true, //Any user created will be automatically active
  },
});

module.exports = mongoose.model("User", userSchema);
