// pages/api/teams/[id].js

import Team from "../../../models/Team";
import connectMongoDB from "../../../utils/dbConnect";

export default async function handler(req, res) {
  await connectMongoDB();

  const { id } = req.query;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Team ID is required" });
  }

  if (req.method === "PUT") {
    try {
      const team = await Team.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!team) {
        return res
          .status(404)
          .json({ success: false, message: "Team not found" });
      }
      res.status(200).json({ success: true, data: team });
    } catch (error) {
      console.error("Error updating team:", error);
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const team = await Team.findByIdAndDelete(id);
      if (!team) {
        return res
          .status(404)
          .json({ success: false, message: "Team not found" });
      }
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      console.error("Error deleting team:", error);
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
