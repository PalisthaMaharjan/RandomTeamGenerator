import { useState, useEffect } from 'react';
import type { Team } from './TeamManagement';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface TeamFormProps {
  onSubmit: (team: Omit<Team, 'id'> | Team) => void;
  initialData?: Team | null;
  onCancel?: () => void;
}

export default function TeamForm({ onSubmit, initialData, onCancel }: TeamFormProps) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(initialData ? { ...initialData, name } : { name });
    if (!initialData) {
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? 'Edit Team' : 'Add Team'}
      </h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Team Name
          </label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#282a74] focus:ring-[#282a74]"
            required
          />
        </div>

        <div className="flex gap-4 mt-6">
          <Button
            type="submit"
            className="bg-[#282a74] hover:bg-[#282a74] text-white px-4 py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-[#282a74] focus:ring-offset-2"
          >
            {initialData ? 'Save Changes' : 'Add Team'}
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