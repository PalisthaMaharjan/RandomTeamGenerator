
"use client";
import { useCallback, useEffect, useState } from "react";
import TeamForm from "./TeamForm";
import TeamList from "./TeamList";
import DeleteConfirmationModal from "../shared/DeleteConfirmationModal";
import { Player } from "../players/PlayerManagement";
import TeamGenerator from "./TeamGenerator";
import GeneratedTeams from "./GeneratedTeams";

export interface Team {
   _id: string;
    name: string;
 }

 export interface GenerationResult {
  title: string;
  teams: GeneratedTeam[];
  timestamp: string;
}

export interface GeneratedTeam extends Team {
  players: Player[];
  averageSkill: number;
}

const initialTeams: Team[] = [];

const TeamManagementPage = () => {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [isAdding, setIsAdding] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<GenerationResult | null>(null);

  useEffect(() => {
    // Fetch teams from the API
    const fetchTeams = async () => {
      try {
        const response = await fetch("/api/teams");
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
         
            const mappedTeams: Team[] = data.data.map((team:Team) => ({
              _id: team._id,
              name: team.name,
            }));
            setTeams(mappedTeams); 
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

    fetchTeams();
  }, []);


  const handleAddTeam = async (newTeam: Omit<Team, "_id">) => {
    try {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeam),
      });

      if (response.ok) {
        const data = await response.json();
        setTeams([...teams, { ...newTeam, _id: data.data._id }]);
        setIsAdding(false); 
      } else {
        console.error("Failed to add team");
      }
    } catch (error) {
      console.error("There was an error adding the team:", error);
    }
  };

  const handleEditTeam = async (updatedTeam: Team | Omit<Team, "_id">) => {
    try {
      if (!("_id" in updatedTeam)) {
        console.error("Team ID is missing");
        return;
      }
  
      const response = await fetch(`/api/teams/${updatedTeam._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTeam),
      });
  
      if (response.ok) {
        setTeams(
          teams.map((team) => (team._id === updatedTeam._id ? updatedTeam : team))
        );
        setEditingTeam(null);
      } else {
        console.error("Failed to update team");
      }
    } catch (error) {
      console.error("There was an error updating the team:", error);
    }
  };
  
  const handleDeleteTeam = async (teamToDelete: Team) => {
    try {
      const response = await fetch(`/api/teams/${teamToDelete._id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setTeams(teams.filter((team) => team._id !== teamToDelete._id));
        setIsDeleteModalOpen(false);
        setTeamToDelete(null);
      } else {
        console.error("Failed to delete team");
      }
    } catch (error) {
      console.error("There was an error deleting the team:", error);
    }
  };
  

  const handleEditClick = (team: Team) => {
    setEditingTeam(team);
  };

  const handleDeleteClick = (team: Team) => {
    setTeamToDelete(team);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (teamToDelete) {
      handleDeleteTeam(teamToDelete);
    }
  };

  const onGenerate = useCallback((result: GenerationResult) => {
    setIsGenerating(false);
    setGenerationResult(result);
  }, []);


  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await fetch("/api/players");
      const data = await response.json();
      if (response.ok) {
        setPlayers(data.data);
      } else {
        console.error("Failed to fetch players:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  
  return (
    <div className="space-y-8">
      <button
        onClick={() => setIsAdding(true)}
        className="bg-[#282a74] text-white px-4 py-2 rounded-md"
      >
        Add Team
      </button>

      {isAdding && (
        <TeamForm onSubmit={handleAddTeam} onCancel={() => setIsAdding(false)} />
      )}

      {editingTeam && (
        <TeamForm
          onSubmit={handleEditTeam}
          initialData={editingTeam}
          onCancel={() => setEditingTeam(null)}
        />
      )}
            


      <TeamList
        teams={teams}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Team"
        message={`Are you sure you want to delete ${teamToDelete?.name}? This action cannot be undone.`}
      />
      <TeamGenerator
        players={players}
        onGenerate={onGenerate}
        isGenerating={isGenerating}
      />

      {generationResult && (
        <GeneratedTeams
          result={generationResult}
          onClose={() => setGenerationResult(null)}
        />
      )}
    </div>
  );
};

export default TeamManagementPage;

