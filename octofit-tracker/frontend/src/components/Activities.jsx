import { useEffect, useState } from 'react';

import { getApiUrl, getCollectionItems } from '../api.js';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState('Loading activities...');

  useEffect(() => {
    let isMounted = true;

    async function loadActivities() {
      try {
        const response = await fetch(getApiUrl('activities'));

        if (!response.ok) {
          throw new Error(`Activities request failed with ${response.status}`);
        }

        const responseBody = await response.json();
        const items = getCollectionItems(responseBody);

        if (isMounted) {
          setActivities(items);
          setStatus(items.length ? '' : 'No activities found.');
        }
      } catch (error) {
        if (isMounted) {
          setStatus(error instanceof Error ? error.message : 'Unable to load activities.');
        }
      }
    }

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="data-panel">
      <div className="panel-heading">
        <span className="eyebrow">Movement</span>
        <h1>Activities</h1>
      </div>
      {status ? <p className="status-text">{status}</p> : null}
      <div className="resource-grid">
        {activities.map((activity) => (
          <article className="resource-card" key={activity._id ?? activity.id}>
            <h2>{activity.type ?? activity.name ?? 'Activity'}</h2>
            <p>{activity.durationMinutes ?? activity.duration ?? 0} minutes</p>
            <span>{activity.caloriesBurned ?? activity.calories ?? 0} calories</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Activities;