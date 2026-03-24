function AdminView({ user }) {
    return (
        <div>
            <h2>Admin Panel</h2>
            <p>Welcome {user.username}</p>
        </div>
    );
}

export default AdminView;