import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog", // Link with blog if needed
      required: false,
    }
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
