import './styles/global.css'

import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminView from "./pages/AdminView";
import ModeratorView from "./pages/ModeratorView";

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const views = {
    1: <AdminView user={user} />,
    2: <ModeratorView user={user} />,
    3: <Dashboard user={user} />
  };

  return views[user.role_id] || <Dashboard user={user} />;
}

export default App;