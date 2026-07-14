import { Ear, HeartHandshake, Link as LinkIcon } from 'lucide-react';
import { PlaceholderImage } from '../components/PlaceholderImage';

const points = [
  { label: 'Listen', icon: Ear, accent: 'blue' },
  { label: 'Support', icon: HeartHandshake, accent: 'green' },
  { label: 'Connect', icon: LinkIcon, accent: 'purple' },
];

export function About() {
  return (
    <main className="page">
      <section className="page-heading">
        <span className="doodle-star" aria-hidden="true">✦</span>
        <h1>What is SWAG?</h1>
      </section>
      <section className="split-layout about-layout">
        <PlaceholderImage label="Large content placeholder" />
        <div>
          <div className="placeholder-lines large">
            <span className="line wide" />
            <span className="line wide" />
            <span className="line medium" />
            <span className="line wide" />
            <span className="line short" />
          </div>
          <div className="point-grid">
            {points.map((point) => {
              const Icon = point.icon;
              return (
                <article key={point.label} className={`point-card accent-${point.accent}`}>
                  <Icon aria-hidden="true" />
                  <strong>{point.label}</strong>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <span className="floating-doodle blue" aria-hidden="true" />
      <span className="floating-doodle green" aria-hidden="true" />
      <span className="floating-doodle purple" aria-hidden="true" />
    </main>
  );
}
