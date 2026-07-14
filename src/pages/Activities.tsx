import { ActivityCard } from '../components/ActivityCard';
import { placeholderActivities } from '../data/placeholderActivities';

export function Activities() {
  return (
    <main className="page">
      <section className="page-heading">
        <h1>Our Activities</h1>
        <p>Activity stories and images will be added soon.</p>
      </section>
      <section className="activity-grid" id="activity-placeholder">
        {placeholderActivities.map((activity, index) => (
          <ActivityCard key={activity.id} activity={activity} index={index} />
        ))}
      </section>
      <div className="center">
        <button className="button secondary" type="button">See All Activities</button>
      </div>
    </main>
  );
}
