
import Player from '../../../models/Player';
import dbConnect from '../../../utils/dbConnect';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const player = await Player.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!player) {
          return res.status(404).json({ success: false, error: 'Player not found' });
        }
        res.status(200).json({ success: true, data: player });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'DELETE':
      try {
        const deletedPlayer = await Player.deleteOne({ _id: id });
        if (!deletedPlayer) {
          return res.status(404).json({ success: false, error: 'Player not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
} 