import { useState, useEffect } from 'react';
import type { Player } from './PlayerManagement';

interface PlayerFormProps {
  onSubmit: (player: Player) => void;
  initialData?: Player | null;
  onCancel?: () => void;
}

export default function PlayerForm({ onSubmit, initialData, onCancel }: PlayerFormProps) {
  const [name, setName] = useState('');
  const [skillLevel, setSkillLevel] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSkillLevel(initialData.skillLevel);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      debugger;
      const response = await fetch('/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, skillLevel }),
      });
      const data = await response.json();
      debugger;
      if (response.ok) {
        onSubmit(data.data);
        setName('');
        setSkillLevel(1);
      } else {
        console.error('Failed to add player:', data.error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? 'Edit Player' : 'Add Player'}
      </h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700">
            Skill Level
          </label>
          <div className="mt-2 flex gap-4">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSkillLevel(level)}
                className={`w-10 h-10 rounded-full ${
                  skillLevel === level
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Saving...' : initialData ? 'Save Changes' : 'Add Player'}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
} 