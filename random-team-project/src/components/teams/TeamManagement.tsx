"use client"
import { useState } from 'react';
import { Player } from '../players/PlayerManagement';
import DeleteConfirmationModal from '../shared/DeleteConfirmationModal';
import TeamForm from './TeamForm';
import TeamGenerator from './TeamGenerator';
import TeamList from './TeamList';
import GeneratedTeams from './GeneratedTeams';


export interface Team {
  id: string;
  name: string;
}

export interface GeneratedTeam extends Team {
  players: Player[];
  averageSkill: number;
}

export interface GenerationResult {
  title: string;
  teams: GeneratedTeam[];
  timestamp: string;
}

export default function TeamManagement() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<GenerationResult | null>(null);

  const handleAddTeam = (team: Omit<Team, 'id'>) => {
    const newTeam = {
      ...team,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTeams([...teams, newTeam]);
  };

  const handleEditTeam = (updatedTeam: Omit<Team, 'id'> | Team) => {
    if ('id' in updatedTeam) {
      setTeams(teams.map(t => 
        t.id === updatedTeam.id ? updatedTeam : t
      ));
      setEditingTeam(null);
    }
  };

  const handleDeleteClick = (team: Team) => {
    setTeamToDelete(team);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (teamToDelete) {
      setTeams(teams.filter(t => t.id !== teamToDelete.id));
      setIsDeleteModalOpen(false);
      setTeamToDelete(null);
    }
  };

  const handleGenerateTeams = (title: string) => {
    setIsGenerating(true);
    // Simulated team generation - replace with actual logic
    setTimeout(() => {
      const result: GenerationResult = {
        title,
        timestamp: new Date().toISOString(),
        teams: [
          {
            id: '1',
            name: 'Team A',
            players: [
              { id: '1', name: 'Player 1', skillLevel: 4 },
              { id: '2', name: 'Player 2', skillLevel: 3 },
            ],
            averageSkill: 3.5
          },
          {
            id: '2',
            name: 'Team B',
            players: [
              { id: '3', name: 'Player 3', skillLevel: 5 },
              { id: '4', name: 'Player 4', skillLevel: 2 },
            ],
            averageSkill: 3.5
          }
        ]
      };
      setGenerationResult(result);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <TeamForm 
        onSubmit={editingTeam ? handleEditTeam : handleAddTeam}
        initialData={editingTeam}
        onCancel={editingTeam ? () => setEditingTeam(null) : undefined}
      />
      
      <TeamGenerator 
        onGenerate={handleGenerateTeams}
        isGenerating={isGenerating}
      />

      {generationResult && (
        <GeneratedTeams
          result={generationResult}
          onClose={() => setGenerationResult(null)}
        />
      )}

      <TeamList 
        teams={teams}
        onEdit={setEditingTeam}
        onDelete={handleDeleteClick}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Team"
        message={`Are you sure you want to delete ${teamToDelete?.name}? This action cannot be undone.`}
      />
    </div>
  );
} 