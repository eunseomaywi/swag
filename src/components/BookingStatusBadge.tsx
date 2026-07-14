import type { BookingStatus } from '../types';

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return <span className={`status-badge status-${status.toLowerCase()}`}>{status}</span>;
}
