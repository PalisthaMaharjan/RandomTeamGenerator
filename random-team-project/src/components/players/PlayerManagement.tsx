"use client"
import { useState, useEffect } from 'react';
import PlayerForm from './PlayerForm';
import PlayerList from './PlayerList';
import DeleteConfirmationModal from '../shared/DeleteConfirmationModal';


export interface Player {
  _id: string;
  name: string;
  skillLevel: number;
}

export default function PlayerManagement() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [playerToDelete, setPlayerToDelete] = useState<Player | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  useEffect(() => {
    // Fetch players from the API
    const fetchPlayers = async () => {
      try {
        const response = await fetch("/api/players");
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            const mappedPlayers: Player[] = data.data.map((player:Player) => ({
              _id: player._id,
              name: player.name,
              skillLevel: player.skillLevel
            }));
            setPlayers(mappedPlayers); 
          } else {
            console.error("Failed to fetch teams:", data.message);
        
          }
        } else {
          console.error("Failed to fetch teams. Status:", response.status);
          
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
        
      }
    };

    fetchPlayers(); 
  }, []);

    const handleAddPlayer = async (newPlayer: Omit<Player, "_id">) => {
    try {
      const response = await fetch('/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlayer),
      });
      
      if (response.ok) {
        const data = await response.json();
        setPlayers([...players, { ...newPlayer, _id: data.data._id }]);
      
      } else {
        console.error('Failed to add player:');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };


    const handleEditPlayer= async (updatedPlayer: Player | Omit<Player, "_id">) => {
    try {
      if (!("_id" in updatedPlayer)) {
        console.error("Team ID is missing");
        return;
      }
      const response = await fetch(`/api/players/${updatedPlayer._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPlayer),
      });
      const data = await response.json();
      if (response.ok) {
      
        setPlayers(
          players.map((player) => (player._id === updatedPlayer._id ? updatedPlayer : player))
        );
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

  const handleDeleteConfirm = () => {
    if (playerToDelete) {
      handleDeletePlayer(playerToDelete);
    }
  };

  const handleDeletePlayer= async (playerToDelete: Player) => {
    try {
      const response = await fetch(`/api/players/${playerToDelete._id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setPlayers(players.filter((player) => player._id !== playerToDelete._id));
        setIsDeleteModalOpen(false);
        setPlayerToDelete(null);
      } else {
        console.error("Failed to delete team");
      }
    } catch (error) {
      console.error("There was an error deleting the team:", error);
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