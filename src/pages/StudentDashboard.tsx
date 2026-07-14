import { BookingStatusBadge } from '../components/BookingStatusBadge';

export function StudentDashboard() {
  return (
    <main className="page dashboard-page">
      <h1>Student Dashboard</h1>
      <section className="dashboard-grid">
        <article className="dashboard-panel">
          <h2>My Bookings</h2>
          <div className="booking-card">
            <strong>2026-07-20</strong>
            <span>First Lunch</span>
            <span>Academic Stress</span>
            <BookingStatusBadge status="Pending" />
            <button className="button secondary" type="button">Cancel Booking</button>
          </div>
        </article>
        <article className="dashboard-panel">
          <h2>Concern Submission</h2>
          <p>Your concern submission was received.</p>
          <p className="small-note">Full concern details are not displayed here when privacy is preferred.</p>
        </article>
      </section>
    </main>
  );
}
