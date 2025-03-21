import Layout from "@/components/layout/layout";
import PlayerManagement from "@/components/players/PlayerManagement";

const PlayersPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-[120px]">
        <h1 className="text-3xl font-bold mb-8">Player Management</h1>
        <PlayerManagement />
      </div>
    </Layout>
  );
} 

export default PlayersPage;