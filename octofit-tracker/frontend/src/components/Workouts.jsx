import { useEffect, useState } from 'react';

import { getCollectionItems } from '../api.js';

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState('Loading workouts...');

  useEffect(() => {
    let isMounted = true;

    async function loadWorkouts() {
      try {
        const response = await fetch(apiEndpoint);

        if (!response.ok) {
          throw new Error(`Workouts request failed with ${response.status}`);
        }

        const responseBody = await response.json();
        const items = getCollectionItems(responseBody);

        if (isMounted) {
          setWorkouts(items);
          setStatus(items.length ? '' : 'No workouts found.');
        }
      } catch (error) {
        if (isMounted) {
          setStatus(error instanceof Error ? error.message : 'Unable to load workouts.');
        }
      }
    }

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="data-panel">
      <div className="panel-heading">
        <span className="eyebrow">Plans</span>
        <h1>Workouts</h1>
      </div>
      {status ? <p className="status-text">{status}</p> : null}
      <div className="resource-grid">
        {workouts.map((workout) => (
          <article className="resource-card" key={workout._id ?? workout.id ?? workout.title}>
            <h2>{workout.title ?? workout.name ?? 'Workout'}</h2>
            <p>{workout.level ?? workout.difficulty ?? 'All levels'}</p>
            <span>{workout.durationMinutes ?? workout.duration ?? 0} minutes</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Workouts;