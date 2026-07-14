import { MemberCard } from '../components/MemberCard';
import { placeholderMembers } from '../data/placeholderMembers';

export function Members() {
  return (
    <main className="page">
      <section className="page-heading">
        <h1>Our Members</h1>
        <p>SWAG member details will be added soon.</p>
      </section>
      <section className="card-grid members-grid" aria-label="Member placeholders">
        {placeholderMembers.map((member) => <MemberCard key={member.id} member={member} />)}
      </section>
      <div className="center">
        <button className="button primary" type="button">View All Members</button>
      </div>
    </main>
  );
}
