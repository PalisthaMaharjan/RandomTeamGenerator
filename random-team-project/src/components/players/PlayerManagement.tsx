"use client"
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await fetch('/api/players');
      const data = await response.json();
      if (response.ok) {
        setPlayers(data.data);
      } else {
        console.error('Failed to fetch players:', data.error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleAddPlayer = (player: Player) => {
    setPlayers([...players, player]);
  };

  const handleEditPlayer = async (updatedPlayer: Player) => {
    try {
      const response = await fetch(`/api/players/${updatedPlayer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPlayer),
      });
      const data = await response.json();
      if (response.ok) {
        setPlayers(players.map(p => 
          p.id === updatedPlayer.id ? data.data : p
        ));
        setEditingPlayer(null);
      } else {
        console.error('Failed to update player:', data.error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleDeleteClick = (player: Player) => {
    setPlayerToDelete(player);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (playerToDelete) {
      try {
        const response = await fetch(`/api/players/${playerToDelete.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setPlayers(players.filter(p => p.id !== playerToDelete.id));
          setIsDeleteModalOpen(false);
          setPlayerToDelete(null);
        } else {
          const data = await response.json();
          console.error('Failed to delete player:', data.error);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
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