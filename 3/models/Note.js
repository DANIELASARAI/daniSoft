const mongoose = requie("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, //This is to refer to the user
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/* A separated collection named counter will be created and 
tracks this sequential number and continues to insert it into our notes and 
we'll see that id inside of the counter collection, 
and then we need to tell it what number to start the tickets at. */
noteSchema.plugin(AutoIncrement, {
  inc_field: "ticket",
  id: "ticketNums",
  start_seq: 500,
});
module.exports = mongoose.model("Note", noteSchema);
