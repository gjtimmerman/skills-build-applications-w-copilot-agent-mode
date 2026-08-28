import { useEffect, useState } from 'react';

import { getCollectionItems } from '../api.js';

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

function Users() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('Loading users...');

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        const response = await fetch(apiEndpoint);

        if (!response.ok) {
          throw new Error(`Users request failed with ${response.status}`);
        }

        const responseBody = await response.json();
        const items = getCollectionItems(responseBody);

        if (isMounted) {
          setUsers(items);
          setStatus(items.length ? '' : 'No users found.');
        }
      } catch (error) {
        if (isMounted) {
          setStatus(error instanceof Error ? error.message : 'Unable to load users.');
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="data-panel">
      <div className="panel-heading">
        <span className="eyebrow">Profiles</span>
        <h1>Users</h1>
      </div>
      {status ? <p className="status-text">{status}</p> : null}
      <div className="resource-grid">
        {users.map((user) => (
          <article className="resource-card" key={user._id ?? user.id ?? user.email}>
            <h2>{user.name ?? user.username ?? 'OctoFit user'}</h2>
            <p>{user.email ?? user.role ?? 'Active member'}</p>
            <span>{user.role ?? user.team ?? 'Athlete'}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Users;