import React, { useState } from "react";
import { login } from "./api";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("hr@company.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await login(email, password);
    if (res.token) {
      onLogin(res.token, res.role);
    } else {
      setError(res.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-violet-200">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg min-w-[350px]">
        <h1 className="text-2xl font-bold mb-4 text-blue-800">Recruitment Portal Login</h1>
        <div className="mb-3">
          <label className="block text-gray-700">Email</label>
          <input className="w-full border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Password</label>
          <input className="w-full border rounded px-3 py-2" value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        </div>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
}
