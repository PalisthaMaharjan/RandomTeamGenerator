
import Player from "../../../models/Player";
import connectMongoDB from "../../../utils/dbConnect";

export default async function handler(req, res) {
  const { method } = req;



  try {
    console.log("Attempting to connect to database..."); 
    await connectMongoDB();
    console.log("Database connection successful"); 
  } catch (error) {
    console.error("Database connection error:", error);
    return res.status(500).json({
      success: false,
      error: `Database connection failed: ${error.message}`,
    }); // Include error message
  }

  switch (method) {
    case "GET":
      try {
        const players = await Player.find({});
        res.status(200).json({ success: true, data: players });
      } catch (error) {
        console.error("Error fetching players:", error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case "POST":
      console.log("Processing POST request..."); 
      try {
        const player = await Player.create(req.body);
        res.status(201).json({ success: true, data: player });
      } catch (error) {
        console.error("Error creating player:", error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
