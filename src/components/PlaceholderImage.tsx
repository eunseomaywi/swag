type PlaceholderImageProps = {
  shape?: 'box' | 'circle';
  label?: string;
};

export function PlaceholderImage({ shape = 'box', label = 'Image coming soon' }: PlaceholderImageProps) {
  return (
    <div className={`placeholder-image ${shape}`} aria-label={label} role="img">
      <span />
      <span />
    </div>
  );
}
