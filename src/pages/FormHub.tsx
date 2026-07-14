import { CalendarDays, Heart, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const forms = [
  {
    to: '/form/booking',
    icon: CalendarDays,
    title: 'Peer Mentor Booking Form',
    accent: 'blue',
  },
  {
    to: '/form/concern',
    icon: Heart,
    title: 'Concern Form',
    accent: 'orange',
  },
];

export function FormHub() {
  return (
    <main className="page">
      <section className="form-hub-layout">
        <div className="page-heading form-copy">
          <h1>Form</h1>
          <p>Use the forms below to book a peer mentor session or share a concern with SWAG.</p>
          <span className="pink-arrow-doodle" aria-hidden="true" />
        </div>
        <div className="form-hub-grid">
          {forms.map((form) => {
            const Icon = form.icon;
            return (
              <Link key={form.to} to={form.to} className={`form-select-card accent-${form.accent}`}>
                <Icon aria-hidden="true" />
                <h2>{form.title}</h2>
                <div className="placeholder-lines">
                  <span className="line wide" />
                  <span className="line medium" />
                </div>
                <span className="circle-arrow" aria-label={`Open ${form.title}`}>
                  <MoveRight aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
