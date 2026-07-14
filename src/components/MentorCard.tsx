import { MemberCard } from './MemberCard';
import type { Member } from '../types';

export function MentorCard({ mentor }: { mentor: Member }) {
  return <MemberCard member={mentor} />;
}
