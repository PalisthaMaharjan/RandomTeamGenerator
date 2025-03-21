"use client"
import { useState } from 'react';
import PlayerForm from './PlayerForm';
import PlayerList from './PlayerList';
import DeleteConfirmationModal from '../shared/DeleteConfirmationModal';


export interface Player {
  id: string;
  name: string;
  skillLevel: number;
}

export default function PlayerManagement() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [playerToDelete, setPlayerToDelete] = useState<Player | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleAddPlayer = (player: Omit<Player, 'id'>) => {
    const newPlayer = {
      ...player,
      id: Math.random().toString(36).substr(2, 9),
    };
    setPlayers([...players, newPlayer]);
  };

  const handleEditPlayer = (updatedPlayer: Omit<Player, 'id'> | Player) => {
    if ('id' in updatedPlayer) {
      setPlayers(players.map(p => 
        p.id === updatedPlayer.id ? updatedPlayer : p
      ));
      setEditingPlayer(null);
    }
  };

  const handleDeleteClick = (player: Player) => {
    setPlayerToDelete(player);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (playerToDelete) {
      setPlayers(players.filter(p => p.id !== playerToDelete.id));
      setIsDeleteModalOpen(false);
      setPlayerToDelete(null);
    }
  };

  return (
    <div className="space-y-8">
      <PlayerForm 
        onSubmit={editingPlayer ? handleEditPlayer : handleAddPlayer}
        initialData={editingPlayer}
        onCancel={editingPlayer ? () => setEditingPlayer(null) : undefined}
      />
      
      <PlayerList 
        players={players}
        onEdit={setEditingPlayer}
        onDelete={handleDeleteClick}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Player"
        message={`Are you sure you want to delete ${playerToDelete?.name}? This action cannot be undone.`}
      />
    </div>
  );
} 