// import dbConnect from '../../../utils/dbConnect';
// import Player from '../../../models/Player';

// export default async function handler(req, res) {
//   const { method } = req;

//   try {
//     await dbConnect();
//     console.log('Database connection successful');
//   } catch (error) {
//     console.error('Database connection error:', error);
//   }

//   switch (method) {
//     case 'GET':
//       try {
//         const players = await Player.find({});
//         res.status(200).json({ success: true, data: players });
//       } catch (error) {
//         res.status(400).json({ success: false, error: error.message });
//       }
//       break;
//     case 'POST':
//       console.log('testttttt')
//       try {
//         const player = await Player.create(req.body);
//         res.status(201).json({ success: true, data: player });
//       } catch (error) {
//         console.log('400')
//         res.status(400).json({ success: false, error: error.message });
//       }
//       break;
//     default:
//       res.setHeader('Allow', ['GET', 'POST']);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
// } 

import dbConnect from '../../../utils/dbConnect';
import Player from '../../../models/Player';

export default async function handler(req, res) {
  const { method } = req;

  try {
    await dbConnect(); // Await the database connection
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
