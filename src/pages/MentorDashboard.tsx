import { BookingStatusBadge } from '../components/BookingStatusBadge';

export function MentorDashboard() {
  return (
    <main className="page dashboard-page">
      <h1>Peer Mentor Dashboard</h1>
      <section className="dashboard-grid">
        <article className="dashboard-panel">
          <h2>Available Requests</h2>
          <div className="booking-card">
            <strong>2026-07-21</strong>
            <span>Break</span>
            <span>Friendships</span>
            <BookingStatusBadge status="Pending" />
            <div className="button-row">
              <button className="button primary" type="button">Accept</button>
              <button className="button secondary" type="button">Decline</button>
            </div>
          </div>
        </article>
        <article className="dashboard-panel">
          <h2>Confirmed Sessions</h2>
          <div className="placeholder-lines">
            <span className="line wide" />
            <span className="line medium" />
          </div>
        </article>
      </section>
    </main>
  );
}
