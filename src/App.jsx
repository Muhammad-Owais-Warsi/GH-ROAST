import { useState } from "react";
import { FaGithub } from 'react-icons/fa';
import { getRoast } from "./data/data";

function App() {
  const [username, setUsername] = useState("");
  const [roast, setRoast] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (username.trim() === "") {
        setRoast("Please enter a valid GitHub username.");
        setIsLoading(false);
        return;
      }
      const result = await getRoast(username); 
      setRoast(result || "Couldn't generate a roast. Try again!");
    } catch (error) {
      console.error("Error fetching data:", error);
      setRoast("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 p-6 relative">
      <div className="absolute top-4 left-4">
        <button
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
          onClick={() => window.open('https://github.com/Muhammad-Owais-Warsi/GH-ROAST', '_blank')}
        >
          <FaGithub size={20} />
          <span>Star on GitHub</span>
        </button>
      </div>

      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-xl p-8 text-center max-w-lg w-full">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to the Roast Machine!
          </h1>
          <p className="text-white/80 mb-6">
            Enter your GitHub username to get a personalized roast!
          </p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="GitHub Username"
            className="w-full p-3 rounded-lg mb-4 text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            onClick={fetchData}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
          >
            {!isLoading ? 'Get A Roast' : 'Loading...'}
          </button>

          <div className="mt-6 bg-white/20 p-4 rounded-md text-white">
            <p className="text-lg">{roast}</p>
          </div>
        </div>
      </div>

    
      <footer className="absolute  left-0 right-0 text-center">
        <p className="text-white text-sm">
          Developed by <a href="https://github.com/Muhammad-Owais-Warsi" className="font-bold underline">Owais</a>
        </p>
      </footer>
    </div>
  );
}


export default App;
