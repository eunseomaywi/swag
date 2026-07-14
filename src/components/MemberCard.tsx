import { PlaceholderImage } from './PlaceholderImage';
import type { Member } from '../types';

export function MemberCard({ member }: { member: Member }) {
  return (
    <article className={`member-card accent-${member.accent}`}>
      <PlaceholderImage shape="circle" label="Profile placeholder" />
      <div className="placeholder-lines">
        <span className="line wide" />
        <span className="line medium" />
        <span className="line short" />
      </div>
      <span className="mini-squiggle" aria-hidden="true" />
    </article>
  );
}
