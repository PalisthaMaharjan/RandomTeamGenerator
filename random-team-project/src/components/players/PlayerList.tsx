import { PencilLineIcon, Trash2Icon } from 'lucide-react';
import type { Player } from './PlayerManagement';

interface PlayerListProps {
  players: Player[];
  onEdit: (player: Player) => void;
  onDelete: (player: Player) => void;
}

export default function PlayerList({ players, onEdit, onDelete }: PlayerListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Players List</h2>
        
        {players.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No players added yet.</p>
        ) : (
          <div className="space-y-4">
            {players.map((player) => (
              <div
                key={player._id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <span className="font-medium">{player.name}</span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                          level <= player.skillLevel
                            ? 'bg-[#282a74] text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {level}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(player)}
                    className="text-[#282a74] hover:text-[#121226] px-3 py-1 rounded-md hover:bg-blue-50"
                  >
                   <PencilLineIcon/>
                  </button>
                  <button
                    onClick={() => onDelete(player)}
                    className="text-red-600 hover:text-red-800 px-3 py-1 rounded-md hover:bg-red-50"
                  >
                    <Trash2Icon/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 