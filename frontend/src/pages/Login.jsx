import { useState } from "react";
import { login } from "../services/api";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const res = await login(username, password);

        if (res.status) {
            onLogin(res);
        } else {
            alert(res.message);
        }
    };

    const handleRegister = async () => {
        const res = await register(username, password);

        if (res.status) {
            alert("User created! Now login");
        } else {
            alert(res.message);
        }
    };

    return (
        <div className="login-container">
            <h2>FanDex</h2>

            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Login;