import { useRef } from "react";
import { useCarousel } from "../hooks";
import "./carousel.css";

function Chevron({ flip }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Screenshot slideshow: side arrows, dots, optional thumbnails, swipe on touch,
// auto-advance with a progress bar, loops back to the first image.
// Themed per variant through the --car-* custom properties in carousel.css.
export default function Carousel({ images, title, thumbs = false, interval = 5000, className = "" }) {
  const { ref, index, running, go, next, prev, holdHandlers } = useCarousel(images.length, interval);
  const touchX = useRef(null);
  const many = images.length > 1;

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchX.current = null;
  };

  return (
    <div
      ref={ref}
      className={`car ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} screenshots`}
      {...holdHandlers}
    >
      <div className="car-view" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={i === index ? `${title} screenshot ${i + 1} of ${images.length}` : ""}
            aria-hidden={i !== index}
            loading="lazy"
            className={i === index ? "is-active" : undefined}
          />
        ))}
        {many && (
          <>
            <button className="car-arrow car-prev" onClick={prev} aria-label="Previous screenshot">
              <Chevron flip />
            </button>
            <button className="car-arrow car-next" onClick={next} aria-label="Next screenshot">
              <Chevron />
            </button>
            <div className="car-dots">
              {images.map((src, i) => (
                <button
                  key={src}
                  className={i === index ? "is-active" : undefined}
                  aria-label={`Show screenshot ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => go(i)}
                />
              ))}
            </div>
            {running && (
              <span key={index} className="car-progress" style={{ animationDuration: `${interval}ms` }} />
            )}
          </>
        )}
      </div>
      {thumbs && many && (
        <div className="car-thumbs">
          {images.map((src, i) => (
            <button
              key={src}
              className={i === index ? "is-active" : undefined}
              aria-label={`Show screenshot ${i + 1}`}
              aria-pressed={i === index}
              onClick={() => go(i)}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
