import { useState } from "react";
import { login, register } from "../services/api";
import "./Login.css";

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
        <div className="login-wrapper">
            <div className="login-container">
                <h2>FanDex</h2>
                <div className="login-subtitle">Curated Collection Tracking</div>
                
                <div className="login-form-group">
                    <span className="login-icon">✧</span>
                    <input
                        className="login-input"
                        placeholder="USERNAME"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="login-form-group">
                    <span className="login-icon">✦</span>
                    <input
                        className="login-input"
                        type="password"
                        placeholder="PASSWORD"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="login-actions">
                    <button className="login-btn" onClick={handleLogin}>
                        Enter Vault
                    </button>
                    <button className="login-btn login-btn-secondary" onClick={handleRegister}>
                        Begin Archiving
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;