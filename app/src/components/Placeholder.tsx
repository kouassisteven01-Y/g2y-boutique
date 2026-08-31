import type { CSSProperties } from 'react';

/** Striped placeholder standing in for a product/hero photo — the user said
 * real photos will follow later, so the prototype's striped blocks are kept
 * as-is rather than inventing imagery. */
export default function Placeholder({
  caption,
  style,
  bordered,
}: {
  caption?: string;
  style?: CSSProperties;
  bordered?: boolean;
}) {
  return (
    <div
      className="ph"
      style={{
        position: 'relative',
        borderRadius: 4,
        border: bordered ? '2px solid var(--color-accent)' : undefined,
        ...style,
      }}
    >
      {caption && <span className="ph-caption">{caption}</span>}
    </div>
  );
}
