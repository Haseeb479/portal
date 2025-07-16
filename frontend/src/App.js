import React, { useState } from "react";
import LoginPage from "./LoginPage";
import HRDashboard from "./HRDashboard";

function App() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    return token ? { token, role } : null;
  });

  const handleLogin = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setUser({ token, role });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
  };

  if (!user) return <LoginPage onLogin={handleLogin} />;

  return (
    <div>
      <div className="flex justify-end p-4">
        <button className="bg-red-400 text-white px-4 py-2 rounded-lg" onClick={handleLogout}>Logout</button>
      </div>
      <HRDashboard token={user.token} role={user.role} />
    </div>
  );
}
export default App;
