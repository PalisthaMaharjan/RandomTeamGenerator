

import Team from "../../../models/Team";
import connectMongoDB from "../../../utils/dbConnect";

export default async function handler(req, res) {
  await connectMongoDB();

  if (req.method === "GET") {
    try {
      const teams = await Team.find({}); // Fetch all teams
      if (teams.length === 0) {
        return res.status(200).json({
          success: true,
          data: [],
          message: "No teams added yet.",
        });
      }
      res.status(200).json({ success: true, data: teams });
    } catch (error) {
      console.error("Error fetching teams:", error);
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const team = await Team.create(req.body);
      res.status(201).json({ success: true, data: team });
    } catch (error) {
      console.error("Error creating team:", error); // Log the error
      res.status(400).json({ success: false, error: error.message }); // Send detailed error
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
