import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, trim: true },
    body: { type: String, trim: true }
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
