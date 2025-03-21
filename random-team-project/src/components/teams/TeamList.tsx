import type { Team } from './TeamManagement';

interface TeamListProps {
  teams: Team[];
  onEdit: (team: Team) => void;
  onDelete: (team: Team) => void;
}

export default function TeamList({ teams, onEdit, onDelete }: TeamListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Teams List</h2>
        
        {teams.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No teams added yet.</p>
        ) : (
          <div className="space-y-4">
            {teams.map((team) => (
              <div
                key={team.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <span className="font-medium">{team.name}</span>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(team)}
                    className="text-[#282a74]  px-3 py-1 rounded-md hover:bg-blue-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(team)}
                    className="text-red-600 hover:text-red-800 px-3 py-1 rounded-md hover:bg-red-50"
                  >
                    Delete
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