// pages/api/teams/index.js

import Team from "../../../models/Team";
import connectMongoDB from "../../../utils/dbConnect";

export default async function handler(req, res) {
  await connectMongoDB();

  if (req.method === "POST") {
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
