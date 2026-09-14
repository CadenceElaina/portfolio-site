import { useEffect } from "react";

// Pages are lazy-loaded, so the browser's own jump to #section fires before the
// section exists. Render this next to the page to redo the jump after mount.
export function ScrollToHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
  }, []);
  return null;
}

// Temporary: floating switcher for comparing redesign variants. Remove once one is chosen.
export default function VariantSwitcher({ variants, active }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 1000,
        display: "flex",
        gap: 4,
        padding: 4,
        borderRadius: 999,
        background: "rgba(20, 20, 24, 0.88)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
        fontFamily: "system-ui, sans-serif",
        fontSize: 12,
        maxWidth: "calc(100vw - 32px)",
        overflowX: "auto",
      }}
    >
      {variants.map((v) => (
        <a
          key={v.key}
          href={`?v=${v.key}`}
          style={{
            padding: "6px 12px",
            borderRadius: 999,
            whiteSpace: "nowrap",
            color: v.key === active ? "#111" : "#ddd",
            background: v.key === active ? "#fff" : "transparent",
            fontWeight: 600,
          }}
        >
          {v.label}
        </a>
      ))}
    </div>
  );
}
