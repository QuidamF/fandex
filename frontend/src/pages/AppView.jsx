import { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import AdminView from "./AdminView";
import ModeratorView from "./ModeratorView";

function AppView() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const views = {
    1: <AdminView user={user} onLogout={() => setUser(null)} />,
    2: <ModeratorView user={user} onLogout={() => setUser(null)} />,
    3: <Dashboard user={user} onLogout={() => setUser(null)} />
  };

  return views[user.role_id] || <Dashboard user={user} onLogout={() => setUser(null)} />;
}

export default AppView;
