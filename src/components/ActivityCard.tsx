import { ArrowRight } from 'lucide-react';
import { PlaceholderImage } from './PlaceholderImage';
import type { Activity } from '../types';

export function ActivityCard({ activity, index }: { activity: Activity; index: number }) {
  return (
    <article className={`activity-card activity-${index + 1}`} aria-label={`${activity.title} placeholder`}>
      <PlaceholderImage />
      <div className="placeholder-lines">
        <span className="line medium" />
        <span className="line wide" />
        <span className="line wide" />
        <span className="line short" />
      </div>
      <a href="#activity-placeholder" className="text-link">
        View More <ArrowRight size={16} aria-hidden="true" />
      </a>
    </article>
  );
}
