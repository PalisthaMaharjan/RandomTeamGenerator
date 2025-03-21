import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface TeamGeneratorProps {
  onGenerate: (title: string) => void;
  isGenerating: boolean;
}

export default function TeamGenerator({ onGenerate, isGenerating }: TeamGeneratorProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(title);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Generate Teams</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Event Title
          </label>
          <Input
            type="text"
            id="title"
            placeholder="e.g., Friday Futsal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isGenerating}
          className={`w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
            isGenerating ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isGenerating ? 'Generating Teams...' : 'Generate Teams'}
        </Button>
      </form>
    </div>
  );
} 