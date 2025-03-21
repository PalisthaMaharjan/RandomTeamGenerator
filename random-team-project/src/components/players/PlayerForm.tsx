import { useState, useEffect } from 'react';
import type { Player } from './PlayerManagement';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface PlayerFormProps {
  onSubmit: (player: Omit<Player, 'id'> | Player) => void;
  initialData?: Player | null;
  onCancel?: () => void;
}

export default function PlayerForm({ onSubmit, initialData, onCancel }: PlayerFormProps) {
  const [name, setName] = useState('');
  const [skillLevel, setSkillLevel] = useState(1);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSkillLevel(initialData.skillLevel);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(initialData ? { ...initialData, name, skillLevel } : { name, skillLevel });
    if (!initialData) {
      setName('');
      setSkillLevel(1);
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
          <Input
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
                    ? 'bg-[#282a74] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button
            type="submit"
            className="bg-[#282a74] text-white px-4 py-2 rounded-md hover:bg-[#282a74] focus:outline-none focus:ring-2 focus:ring-[#282a74] focus:ring-offset-2"
          >
            {initialData ? 'Save Changes' : 'Add Player'}
          </Button>
          
          {onCancel && (
            <Button
              type="button"
              onClick={onCancel}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </form>
  );
} 