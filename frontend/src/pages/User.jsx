import { AuthContext } from "../context/AuthContext";
import { useContext } from 'react';

function User() {
  const {logout ,User} = useContext(AuthContext);

  return (
   <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-xl max-w-md mx-auto mt-10 text-center font-sans">
  
  {/* Optional: Add a placeholder for a profile picture */}
  <div className="w-24 h-24 bg-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
    <span className="text-4xl font-bold text-gray-800">
      {User.username.charAt(0).toUpperCase()}
    </span>
  </div>

  {/* Welcome Heading */}
  <h1 className="text-3xl font-bold mb-1">
    Welcome, <span className="text-teal-400">{User.username}</span>!
  </h1>

  {/* User Email */}
  <p className="text-gray-400 text-md mb-8">
    {User.email}
  </p>

  {/* Logout Button */}
  <button 
    onClick={logout} 
    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
  >
    Logout
  </button>
  
</div>
  )
}

export default User