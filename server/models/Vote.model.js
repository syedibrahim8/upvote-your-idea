import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    ideaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Idea",
      required: true
    }
  },
  { timestamps: true }
);

voteSchema.index({ userId: 1 }, { unique: true });
voteSchema.index({ ideaId: 1 });

export default mongoose.model("Vote", voteSchema);