// Floating note on archived versions, linking back to the current site.
export default function ArchiveBanner({ label }) {
  return (
    <div
      role="note"
      style={{
        position: 'fixed',
        left: '50%',
        bottom: '1rem',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'center',
        padding: '0.55rem 1rem',
        borderRadius: '999px',
        background: 'rgba(20, 20, 20, 0.9)',
        color: '#f3f3f3',
        font: '500 13px/1.2 system-ui, sans-serif',
        boxShadow: '0 6px 24px rgba(0, 0, 0, 0.3)',
        whiteSpace: 'nowrap',
      }}
    >
      <span>{label}</span>
      <a href="/" style={{ color: '#9fe0bf', textDecoration: 'underline' }}>
        Current site
      </a>
    </div>
  )
}
