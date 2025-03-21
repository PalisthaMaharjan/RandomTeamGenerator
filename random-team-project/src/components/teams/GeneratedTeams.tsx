import { useState } from 'react';
import type { GenerationResult } from './TeamManagement';

interface GeneratedTeamsProps {
  result: GenerationResult;
  onClose: () => void;
}

export default function GeneratedTeams({ result, onClose }: GeneratedTeamsProps) {
  const [showCopied, setShowCopied] = useState(false);

  const totalPlayers = result.teams.reduce(
    (sum, team) => sum + team.players.length, 
    0
  );

  const handleShare = async () => {
    const shareText = `
${result.title}
Generated Teams (${totalPlayers} players)
${result.teams.map(team => `
${team.name} (Avg. Skill: ${team.averageSkill.toFixed(1)})
${team.players.map(p => `- ${p.name} (Skill: ${p.skillLevel})`).join('\n')}
`).join('\n')}
    `.trim();

    try {
      await navigator.clipboard.writeText(shareText);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-500 text-white px-6 py-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{result.title}</h2>
            <p className="text-sm opacity-80">
              Generated on {new Date(result.timestamp).toLocaleString()}
            </p>
            <p className="text-sm mt-1">
              Total Participants: {totalPlayers}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-md text-sm flex items-center"
            >
              {showCopied ? 'Copied!' : 'Share Teams'}
            </button>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-100 p-2"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 grid gap-6 md:grid-cols-2">
        {result.teams.map((team) => (
          <div
            key={team.id}
            className="border rounded-lg p-4 space-y-4"
          >
            <div className="flex justify-between items-center border-b pb-2">
              <div>
                <h3 className="text-lg font-semibold">{team.name}</h3>
                <p className="text-sm text-gray-500">
                  {team.players.length} players
                </p>
              </div>
              <span className="text-sm text-gray-500">
                Avg. Skill: {team.averageSkill.toFixed(1)}
              </span>
            </div>

            <ul className="space-y-2">
              {team.players.map((player) => (
                <li
                  key={player.id}
                  className="flex justify-between items-center p-2 hover:bg-gray-50 rounded"
                >
                  <span>{player.name}</span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`w-4 h-4 rounded-full ${
                          level <= player.skillLevel
                            ? 'bg-blue-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
} 