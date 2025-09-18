import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../store/Auth";
import Spinner from "../components/Spinner"; // import the spinner component

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true); // ✅ start spinner

    try {
      const endpoint = isLogin ? "login" : "register";
      const payload = isLogin
        ? { email, password }
        : { name, email, password };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/${endpoint}`,
        payload
      );

      if (isLogin) {
        setAuth(response.data.token, response.data.user);

        // Redirect based on role
        if (response.data.user.role === "admin") {
          navigate("/questions");
        } else {
          navigate("/quiz");
        }
      } else {
        // Register success → switch to login mode
        setIsLogin(true);
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
      console.log(err.response?.data?.message);
    } finally {
      setLoading(false); // ✅ stop spinner
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md relative">
        {loading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
            <Spinner size={50} color="#3B82F6" />
          </div>
        )}

        <h2 className="text-2xl mb-4">{isLogin ? "Login" : "Register"}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm">Password *must be 6+ characters*</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
            disabled={loading} // ✅ disable while loading
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            className="text-blue-500 ml-1"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
