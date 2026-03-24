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
    1: <AdminView user={user} />,
    2: <ModeratorView user={user} />,
    3: <Dashboard user={user} />
  };

  return views[user.role_id] || <Dashboard user={user} />;
}

export default AppView;
