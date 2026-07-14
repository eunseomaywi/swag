export function AdminDashboard() {
  const panels = ['Manage Members', 'Manage Activities', 'Manage Mentors', 'Mentor Availability', 'Booking Requests', 'Concern Submissions'];

  return (
    <main className="page dashboard-page">
      <h1>SWAG Admin Dashboard</h1>
      <section className="admin-grid">
        {panels.map((panel) => (
          <article className="dashboard-panel" key={panel}>
            <h2>{panel}</h2>
            <div className="placeholder-lines">
              <span className="line wide" />
              <span className="line medium" />
              <span className="line short" />
            </div>
            <button className="button secondary" type="button">Open</button>
          </article>
        ))}
      </section>
    </main>
  );
}
