import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function User() {
  const { logout, user } = useContext(AuthContext);

    if (!user) {
    return <div>Loading...</div>;
  }


  return (
    <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-xl max-w-md mx-auto mt-10 text-center font-sans">
      {/* Optional: Add a placeholder for a profile picture */}

      {/* Welcome Heading */}
      <h1 className="text-3xl font-bold mb-1">
        Welcome, <span className="text-teal-400">{user.username}</span>!
      </h1>

      {/* User Email */}
      <p className="text-gray-400 text-md mb-8">{user.email}</p>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Logout
      </button>
    </div>
  );
}

export default User;
