import { useEffect, useState } from 'react';

import { getApiUrl, getCollectionItems } from '../api.js';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState('Loading leaderboard...');

  useEffect(() => {
    let isMounted = true;

    async function loadLeaderboard() {
      try {
        const response = await fetch(getApiUrl('leaderboard'));

        if (!response.ok) {
          throw new Error(`Leaderboard request failed with ${response.status}`);
        }

        const responseBody = await response.json();
        const items = getCollectionItems(responseBody);

        if (isMounted) {
          setEntries(items);
          setStatus(items.length ? '' : 'No leaderboard entries found.');
        }
      } catch (error) {
        if (isMounted) {
          setStatus(error instanceof Error ? error.message : 'Unable to load leaderboard.');
        }
      }
    }

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="data-panel">
      <div className="panel-heading">
        <span className="eyebrow">Rankings</span>
        <h1>Leaderboard</h1>
      </div>
      {status ? <p className="status-text">{status}</p> : null}
      <div className="leaderboard-list">
        {entries.map((entry, index) => (
          <article className="leaderboard-row" key={entry._id ?? entry.id ?? `${entry.name}-${index}`}>
            <strong>#{entry.rank ?? index + 1}</strong>
            <span>{entry.name ?? entry.userName ?? 'OctoFit athlete'}</span>
            <b>{entry.points ?? entry.score ?? 0} pts</b>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Leaderboard;