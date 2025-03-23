// TeamGenerator.tsx
import { useState, useCallback } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import type { Player } from '../players/PlayerManagement';
import type {
  GenerationResult,
  GeneratedTeam,
} from './TeamManagement'; 

interface TeamGeneratorProps {
  players: Player[];
  onGenerate: (result: GenerationResult) => void;
  isGenerating: boolean;
}

export default function TeamGenerator({
  players,
  onGenerate,
  isGenerating,
}: TeamGeneratorProps) {
  const [title, setTitle] = useState('');
  const [numberOfTeams, setNumberOfTeams] = useState(2);

  const generateTeams = useCallback(() => {
    if (!title || players.length === 0) return;

    const numTeams = parseInt(numberOfTeams.toString(), 10);
    if (isNaN(numTeams) || numTeams <= 0) {
      alert('Please enter a valid number of teams.');
      return;
    }

    //  Shuffling players
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);

    // Assign players to teams
    const teams: GeneratedTeam[] = Array.from({ length: numTeams }, (_, i) => ({
      _id: `team-${i + 1}`,
      name: `xTeam ${i + 1}`,
      players: [],
      averageSkill: 0,
    }));

    shuffledPlayers.forEach((player, index) => {
      const teamIndex = index % numTeams;
      teams[teamIndex].players.push(player);
    });

    // Calculate average skill for each team
    teams.forEach((team) => {
      const totalSkill = team.players.reduce(
        (sum, player) => sum + player.skillLevel,
        0
      );
      team.averageSkill = team.players.length
        ? totalSkill / team.players.length
        : 0;
    });

    // Create the result object
    const result: GenerationResult = {
      title,
      timestamp: new Date().toISOString(),
      teams,
    };

    onGenerate(result);
  }, [players, title, numberOfTeams, onGenerate]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h2 className="text-xl font-semibold">Team Generator</h2>

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Event Title
        </label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#282a74] focus:ring-[#282a74] focus:ring-offset-2"
        />
      </div>

      <div>
        <label
          htmlFor="numberOfTeams"
          className="block text-sm font-medium text-gray-700"
        >
          Number of Teams
        </label>
        <Input
          type="number"
          id="numberOfTeams"
          value={numberOfTeams}
          onChange={(e) =>
            setNumberOfTeams(parseInt(e.target.value, 10) || 2)
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#282a74] focus:ring-[#282a74] focus:ring-offset-2"
        />
      </div>

      <Button
        onClick={generateTeams}
        disabled={isGenerating || players.length === 0}
        className="bg-[#282a74] hover:bg-[#1e2049] text-white px-4 py-2 rounded-md disabled:bg-gray-400"
      >
        {isGenerating ? 'Generating...' : 'Generate Teams'}
      </Button>
      {players.length === 0 && (
        <p className="text-red-500">Please add players to generate teams.</p>
      )}
    </div>
  );
}
