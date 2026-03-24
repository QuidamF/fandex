function ModeratorView({ user }) {
    return (
        <div>
            <h2>Moderator Panel</h2>
            <p>Welcome {user.username}</p>
        </div>
    );
}

export default ModeratorView;