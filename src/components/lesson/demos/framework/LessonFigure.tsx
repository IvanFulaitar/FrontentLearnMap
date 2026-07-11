import { useEffect, useState } from "react";
import styles from "./framework.module.css";

interface LessonFigureProps {
  /** Path under /public, e.g. "/images/courses/vscode/vscode-open-folder.png". */
  src: string;
  /** Required, specific alt text — describe what the learner should notice. */
  alt: string;
  /** Short caption shown under the image; should not repeat the alt text verbatim. */
  caption?: string;
  /** Intrinsic pixel dimensions of the source file (prevents layout shift). */
  width?: number;
  height?: number;
}

/**
 * Reusable illustration block for lesson diagrams/screenshots. Follows the
 * platform's existing convention of plain `<img src="/images/...">` tags
 * (see HeaderHeroDemo, GridDemo) rather than introducing a new asset
 * pipeline — this component only adds a consistent caption + a text
 * fallback so a broken/missing asset never blocks reading the lesson.
 *
 * The vscode-setup course assets are small raster crops (~380px wide) —
 * `width` is also used as a CSS max-width cap so the browser never
 * upscales/blurs them to fill a wider lesson column; they still shrink
 * responsively below that on narrow viewports (see .lessonFigureImg).
 *
 * Clicking the image opens it in a fullscreen lightbox (close button,
 * Escape key, or clicking the backdrop all close it) — small screenshots
 * are often hard to read at their capped inline width, so this gives the
 * learner a way to see the real resolution without leaving the lesson.
 */
export function LessonFigure({ src, alt, caption, width = 640, height = 360 }: LessonFigureProps) {
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <figure className={styles.lessonFigure}>
      {failed ? (
        <p className={styles.lessonFigureFallback} role="note">
          Зображення тимчасово недоступне. {caption ?? alt}
        </p>
      ) : (
        <button
          type="button"
          className={styles.lessonFigureButton}
          onClick={() => setOpen(true)}
          aria-label={`Відкрити зображення на весь екран: ${alt}`}
        >
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            className={styles.lessonFigureImg}
            style={{ maxWidth: `${width}px` }}
            onError={() => setFailed(true)}
          />
        </button>
      )}
      {caption ? <figcaption className={styles.lessonFigureCaption}>{caption}</figcaption> : null}

      {open ? (
        <div className={styles.lessonFigureLightbox} role="presentation" onClick={() => setOpen(false)}>
          <div
            className={styles.lessonFigureLightboxInner}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.lessonFigureLightboxClose}
              onClick={() => setOpen(false)}
              aria-label="Закрити перегляд зображення"
            >
              ✕
            </button>
            <img src={src} alt={alt} className={styles.lessonFigureLightboxImg} />
            {caption ? <p className={styles.lessonFigureLightboxCaption}>{caption}</p> : null}
          </div>
        </div>
      ) : null}
    </figure>
  );
}
