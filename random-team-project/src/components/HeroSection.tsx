const HeroSection = () => {
  return (
      <>
           {/* Hero Section */}
      <section className="text-center py-12 mt-[100px]">
        <h1 className="sm:text-4xl text-2xl font-bold mb-4">Welcome to Random Team Generator</h1>
        <p className="text-xl text-gray-600 mb-8">
          Create balanced teams based on player skill levels for fair and competitive matches
        </p>
        <div className="space-x-4">
          <a
            href="/players"
            className="bg-[#282a74] text-white px-6 py-3 rounded-lg  transition"
          >
            Add Players
          </a>
          <a
            href="/teams"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            Generate Teams
          </a>
        </div>
      </section>
      </>
  )
}

export default HeroSection;