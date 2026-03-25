import { Navigate } from "react-router-dom";
import React from "react";

function ProtectedRoute({ children, roleId }) {
    const userStr = localStorage.getItem("fandex_user");
    
    if (!userStr) {
        return <Navigate to="/login" replace />;
    }

    const user = JSON.parse(userStr);
    
    if (roleId && user.role_id !== roleId) {
        // Redireccionar si el usuario ingresa a una ruta que no le pertenece
        if (user.role_id === 1) return <Navigate to="/admin" replace />;
        if (user.role_id === 2) return <Navigate to="/moderator" replace />;
        if (user.role_id === 3) return <Navigate to="/fan" replace />;
        return <Navigate to="/login" replace />;
    }

    const onLogout = () => {
        localStorage.removeItem("fandex_user");
        window.location.href = "/login";
    };

    // React.cloneElement permite inyectarle los props {user, onLogout} al componente
    // hijo (Dashboard, AdminView, etc) de manera oculta y masiva.
    return React.cloneElement(children, { user, onLogout });
}

export default ProtectedRoute;
