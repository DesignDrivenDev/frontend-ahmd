import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  //   const isAuthenticated = () => {
  //     // Check if the user is authenticated
  //     return document.cookie.includes("access_token");
  //   };
  //   console.log(isAuthenticated(), "authenticated");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      localStorage.setItem("token", data.token);
      console.log(data, "dataaattatatatat");

      if (!res.ok) {
        throw new Error(data.message);
      }

      // Redirect to homepage
      //   router.push("/users");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto ">
        <h1 className="pb-4 font-semibold text-lg">Login</h1>
        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-500 p-1 rounded-lg"
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-500 p-1 rounded-lg"
              required
            />
          </div>
          {error && <p>{error}</p>}
          <button
            type="submit"
            className="border border-gray-400 px-4 py-1 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
