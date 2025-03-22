// import dbConnect from '../../../utils/dbConnect';
import Player from '../../../models/Player';
import connectMongoDB from '../../../utils/dbConnect';

export default async function handler(req, res) {
  const { method } = req;

  let db; // Declare a variable to hold the database connection

  try {
    db = await connectMongoDB(); 
    debugger;// Await the database connection and store the result
    if (!db) {
      throw new Error('Failed to connect to the database');
    }
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection error:', error);
    return res
      .status(500)
      .json({ success: false, error: 'Database connection failed' }); // Important: Return here!
  }

  switch (method) {
    case 'GET':
      try {
        const players = await Player.find({});
        res.status(200).json({ success: true, data: players });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      console.log('testttttt');
      try {
        const player = await Player.create(req.body);
        res.status(201).json({ success: true, data: player });
      } catch (error) {
        console.log('400');
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
