import {  UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { getRoast } from "./data/data";
import Sign_Up from "./components/sign_in";
import { FaGithub } from 'react-icons/fa';

function App() {
  const { user, isSignedIn } = useUser();

  const [roast, setRoast] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  
  const fetchData = async () => {
    setIsLoading(true);
    if (user) {
      try {
        console.log(user.login)
        const result = await getRoast(user?.username);
        setRoast(result);
        setIsLoading(false);
 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 p-6 relative">
      {isSignedIn ? (
        <div className="flex items-center justify-center min-h-[80vh]">

          <div className="absolute top-4 right-4">
            <UserButton />
          </div>

          {/* Top-Left Start on GitHub Button */}
          <div className="absolute top-4 left-4">
            <button
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              <FaGithub size={20} />
              <span>Star on GitHub</span>
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-xl p-8 text-center max-w-lg w-full">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome, <span className="text-yellow-300">{user?.username || 'User'}</span>!
            </h1>
            <p className="text-white/80 mb-6">
              Ready for a personalized roast? Click the button below!
            </p>
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
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <Sign_Up />
        </div>
      )}
    </div>
  );
}

export default App; 
