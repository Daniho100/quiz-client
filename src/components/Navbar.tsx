import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/Auth";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, token, setAuth, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    setIsOpen(false);
    setDropdownOpen(false)
    navigate("/");
  };

  const handleRoleUpdate = async (newRole: string) => {
     if (!user || !token) {
        alert("You must be logged in to update role");
        return;
    }

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/auth/${user.id}/role`,
        { role: newRole },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response)
      // ✅ Update store with new role
      setAuth(token, { ...user, role: response.data.user.role });
      setDropdownOpen(false);
      alert(`Role updated successfully`);
    } catch (error: any) {
      console.error("Error updating role:", error);
      alert(error.response?.data?.message || "Failed to update role");
    }
  };

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.jpg" alt="Logo" className="h-8 w-8 rounded-md" />
            <span className="font-bold text-lg text-blue-600">Quiz App</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {!user ? (
              <>
                <Link to="/" className="hover:text-blue-500">
                  Home
                </Link>
                <Link to="/about" className="hover:text-blue-500">
                  About
                </Link>
                <Link to="/contact" className="hover:text-blue-500">
                  Contact
                </Link>
                <Link to="/auth" className="hover:text-blue-500">
                  Login/Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/questions" className="hover:text-blue-500">
                  Questions
                </Link>
                <Link to="/quiz" className="hover:text-blue-500">
                  Quiz
                </Link>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
                  >
                    <span className="text-gray-700">
                      Hi, {user.name || user.email}
                    </span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-20">
                      <button
                        onClick={() => handleRoleUpdate("admin")}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Become Admin
                      </button>
                      <button
                        onClick={() => handleRoleUpdate("user")}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Switch to User
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col space-y-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="w-6 h-0.5 bg-gray-800"></span>
            <span className="w-6 h-0.5 bg-gray-800"></span>
            <span className="w-6 h-0.5 bg-gray-800"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-2 space-y-2">
          {!user ? (
            <>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block hover:text-blue-500"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="block hover:text-blue-500"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block hover:text-blue-500"
              >
                Contact
              </Link>
              <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="block hover:text-blue-500"
              >
                Login/Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/questions"
                onClick={() => setIsOpen(false)}
                className="block hover:text-blue-500"
              >
                Questions
              </Link>
              <Link
                to="/quiz"
                onClick={() => setIsOpen(false)}
                className="block hover:text-blue-500"
              >
                Quiz
              </Link>
              <span className="block text-gray-700">
                Hi, {user.name || user.email} ({user?.role})
              </span>
              <button
                onClick={() => handleRoleUpdate("admin")}
                className="block w-full text-left bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
              >
                Become Admin
              </button>
              <button
                onClick={() => handleRoleUpdate("user")}
                className="block w-full text-left bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
              >
                Switch to User
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
