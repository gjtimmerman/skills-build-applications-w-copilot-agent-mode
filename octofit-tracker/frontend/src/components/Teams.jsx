import { useEffect, useState } from 'react';

import { getApiUrl, getCollectionItems } from '../api.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [status, setStatus] = useState('Loading teams...');

  useEffect(() => {
    let isMounted = true;

    async function loadTeams() {
      try {
        const response = await fetch(getApiUrl('teams'));

        if (!response.ok) {
          throw new Error(`Teams request failed with ${response.status}`);
        }

        const responseBody = await response.json();
        const items = getCollectionItems(responseBody);

        if (isMounted) {
          setTeams(items);
          setStatus(items.length ? '' : 'No teams found.');
        }
      } catch (error) {
        if (isMounted) {
          setStatus(error instanceof Error ? error.message : 'Unable to load teams.');
        }
      }
    }

    loadTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="data-panel">
      <div className="panel-heading">
        <span className="eyebrow">Groups</span>
        <h1>Teams</h1>
      </div>
      {status ? <p className="status-text">{status}</p> : null}
      <div className="resource-grid">
        {teams.map((team) => (
          <article className="resource-card" key={team._id ?? team.id ?? team.name}>
            <h2>{team.name ?? 'OctoFit team'}</h2>
            <p>{team.description ?? 'Training together'}</p>
            <span>{team.memberCount ?? team.members?.length ?? 0} members</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Teams;