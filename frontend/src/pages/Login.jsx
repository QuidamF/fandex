import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/api";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const userStr = localStorage.getItem("fandex_user");
        if (userStr) {
            const user = JSON.parse(userStr);
            if (user.role_id === 1) navigate("/admin");
            else if (user.role_id === 2) navigate("/moderator");
            else if (user.role_id === 3) navigate("/fan");
            else navigate("/");
        }
    }, [navigate]);

    const handleLogin = async () => {
        if (!username || !password) {
            alert("Rellena todos los campos");
            return;
        }

        const res = await login(username, password);

        if (res.status) {
            localStorage.setItem("fandex_user", JSON.stringify(res));

            if (res.role_id === 1) navigate("/admin");
            else if (res.role_id === 2) navigate("/moderator");
            else if (res.role_id === 3) navigate("/fan");
            else navigate("/");

        } else {
            alert(res.message);
        }
    };

    const handleRegister = async () => {
        if (!username || !password) {
            alert("Rellena todos los campos");
            return;
        }

        const res = await register(username, password);

        if (res.status) {
            alert("User created! Now login");
        } else {
            alert(res.message);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
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
                        onKeyDown={handleKeyDown}
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
                        onKeyDown={handleKeyDown}
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