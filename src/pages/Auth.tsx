import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../store/Auth";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState(""); // 👈 new state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  try {
    const endpoint = isLogin ? "login" : "register";
    const payload = isLogin
      ? { email, password } // login
      : { name, email, password }; // register

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/${endpoint}`,
      payload
    );

    if (isLogin) {
      // ✅ Store auth data
      setAuth(response.data.token, response.data.user);

      // ✅ Redirect based on role
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
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">{isLogin ? "Login" : "Register"}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Only show name field if Register */}
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
            <label className="block text-sm">Password</label>
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
