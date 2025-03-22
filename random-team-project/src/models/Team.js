// models/Team.js
import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this team."],
    unique: true,
  },
  // Add other fields as needed (description, members, etc.)
});

export default mongoose.models.Team || mongoose.model("Team", teamSchema);
