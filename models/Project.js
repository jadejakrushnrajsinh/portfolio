import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  tech: [String],
  liveDemo: String,
  github: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Project", projectSchema);
