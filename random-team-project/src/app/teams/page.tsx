

import Layout from "@/components/layout/layout";
import TeamManagement from "@/components/teams/TeamManagement";

const PlayersPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-[120px]">
        <h1 className="text-3xl font-bold mb-8">Team Management</h1>
        <TeamManagement />
      </div>
    </Layout>
  );
} 

export default PlayersPage;