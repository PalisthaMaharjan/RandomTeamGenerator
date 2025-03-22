// import mongoose from 'mongoose';

// const PlayerSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Please provide a name for the player.'],
//     maxlength: [100, 'Name cannot be more than 100 characters'],
//   },
//   skillLevel: {
//     type: Number,
//     required: [true, 'Please provide a skill level for the player.'],
//     min: [1, 'Skill level must be at least 1'],
//     max: [5, 'Skill level cannot be more than 5'],
//   },
// });

// export default mongoose.models.Player || mongoose.model('Player', PlayerSchema); 

// models/Player.ts


import mongoose, { Schema } from 'mongoose';

const PlayerSchema = new Schema({
  name: String,
  skillLevel: Number,
});

const Player = mongoose.models.Player || mongoose.model('Player', PlayerSchema);

export default Player;
