const FeaturesSection = () => {
  return (
      <>
      
     <section className="container mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Player Management</h3>
          <p className="text-gray-600">
            Add and manage players with their skill levels on a scale of 1-5
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Skill-Based Balancing</h3>
          <p className="text-gray-600">
            Generate teams that are balanced based on player skill ratings
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Flexible Team Size</h3>
          <p className="text-gray-600">
            Create teams of any size to match your needs
          </p>
        </div>
        </div>
      </section>
      </>
  )
}

export default FeaturesSection;