import "./stack.css";

// Layered architecture diagram: top layer first, each lower layer a little wider,
// so the foundation sits at the bottom. Themed through the --stk-* properties.
export default function StackDiagram({ stack, tested, className = "" }) {
  return (
    <div className={`stk ${className}`} style={{ "--n": stack.length }}>
      <ol className="stk-layers" aria-label="Tech stack, top layer first">
        {stack.map((l, i) => (
          <li key={l.layer} className="stk-layer" style={{ "--i": i }}>
            <span className="stk-label">{l.layer}</span>
            <span className="stk-items">
              {l.items.map((t) => (
                <span key={t} className="stk-item">
                  {t}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ol>
      {tested && <p className="stk-foot">Tested with {tested.join(" + ")}</p>}
    </div>
  );
}
