import { Heart, Lock, Sparkles, UsersRound } from 'lucide-react';
import { MentorCard } from '../components/MentorCard';
import { placeholderMentors } from '../data/placeholderMentors';

const infoBlocks = [
  { title: 'Student to Student', icon: UsersRound, accent: 'blue' },
  { title: 'Confidential & Safe', icon: Lock, accent: 'green' },
  { title: 'Supportive & Kind', icon: Heart, accent: 'pink' },
  { title: 'Here for Everyone', icon: Sparkles, accent: 'purple' },
];

export function PeerMentor() {
  return (
    <main className="page">
      <section className="peer-intro">
        <div>
          <h1>Peer Mentor</h1>
          <p>Need someone to talk to? Our peer mentors are here for you.</p>
          <div className="placeholder-lines">
            <span className="line wide" />
            <span className="line medium" />
            <span className="line wide" />
          </div>
        </div>
        <div className="speech-illustration" aria-label="Friendly speech bubbles" role="img">
          <span className="bubble smile">:)</span>
          <span className="bubble heart">♡</span>
        </div>
      </section>

      <section className="point-grid four">
        {infoBlocks.map((block) => {
          const Icon = block.icon;
          return (
            <article key={block.title} className={`point-card accent-${block.accent}`}>
              <Icon aria-hidden="true" />
              <strong>{block.title}</strong>
            </article>
          );
        })}
      </section>

      <section className="page-heading compact">
        <h2>Meet the Peer Mentors</h2>
      </section>
      <section className="card-grid members-grid">
        {placeholderMentors.map((mentor) => <MentorCard key={mentor.id} mentor={mentor} />)}
      </section>
    </main>
  );
}
