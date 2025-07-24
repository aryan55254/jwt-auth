import { Children, createContext, useState } from "react";
import { useEffect } from "react";
export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/user/getuser", {
          credentials: "include",
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Could not fetch user status");
      } finally {
        setLoading(false);
      }
    };
    checkUserStatus();
  }, []);
  const login = async (email, password) => {
    try {
      const loginResponse = await fetch(
        "http://localhost:4000/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        console.error("Login API call failed:", errorData.message);
        throw new Error(errorData.message || "Login failed");
      }

      const userResponse = await fetch(
        "http://localhost:4000/api/user/getuser",
        { credentials: "include" }
      );
      const userData = await userResponse.json();

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data after login.");
      }

      setUser(userData);
    } catch (error) {
      console.error("An error occurred in the login process:", error);
      throw error;
    }
  };
  const logout = async () => {
    try {
      // Call the backend to clear the httpOnly cookie
      await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // Always clear user state on the frontend regardless of backend success
      setUser(null);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  const value = { user, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children} {/* FIX: Changed 'Children' to 'children' */}
    </AuthContext.Provider>
  );
};
//ok so AuthContext is empty object with special properties to it , one of them is Provider when used it can be used to feed value to a new new compoenent that feeds all the value to children components and what AuthProvider does is it used that functionality gives it value and as AuthProvider gets exported it is now returning a AuthContext.Provider with values and methods to change that value
