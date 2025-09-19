export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Left side */}
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Quiz App. Helping learners test knowledge and track progress.
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
              🎯 Sharpen Your Skills
            </span>
            <span className="hidden md:inline">•</span>
            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md">
              📊 Track Your Progress
            </span>
            <span className="hidden md:inline">•</span>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md">
              🏆 Learn, Compete & Grow
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
