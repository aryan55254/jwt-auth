import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [error, seterror] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setusername] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) seterror(""); // Clear error on new input
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) seterror(""); // Clear error on new input
  };

  const handleUserNameChange = (e) => {
    setusername(e.target.value);
    if (error) seterror("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    seterror("");

    try {
      // Remember to replace 'YOUR_BACKEND_URL' with your actual backend URL
      // Or set up a proxy in vite.config.js
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to register");
      }

      // On success, navigate to the login page
      navigate("/login");
    } catch (err) {
      seterror(err.message);
    } finally {
      // FIX: This will now run whether the registration succeeds or fails
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-md mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 text-white">
        {/* --- Form Header --- */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-teal-400">
            Welcome
          </h1>
          <p className="text-gray-400 mt-2">Register to continue</p>
        </div>

        {/* --- Form --- */}
        <form onSubmit={handleSubmit} noValidate>
          {/* username input */}
          <div className="relative mb-6">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="username"
              id="username"
              value={username}
              onChange={handleUserNameChange}
              placeholder="Username"
              className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-300"
              required
              autoComplete="username"
            />
          </div>
          {/* --- Email Input --- */}
          <div className="relative mb-6">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-300"
              required
              autoComplete="email"
            />
          </div>

          {/* --- Password Input --- */}
          <div className="relative mb-6">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-300"
              required
              autoComplete="current-password"
            />
          </div>

          {/* --- Error Message --- */}
          {error && (
            <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-6 text-center text-sm">
              {error}
            </div>
          )}

          {/* --- Submit Button --- */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 bg-teal-500 hover:bg-teal-600 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Registerring...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Register
              </>
            )}
          </button>
        </form>

        {/* --- Form Footer --- */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-teal-400 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
