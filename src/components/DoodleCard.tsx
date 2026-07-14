import type { Accent } from '../types';

type DoodleCardProps = {
  children: React.ReactNode;
  accent?: Accent;
  className?: string;
};

export function DoodleCard({ children, accent = 'blue', className = '' }: DoodleCardProps) {
  return <div className={`doodle-card accent-${accent} ${className}`}>{children}</div>;
}
