import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function ProjectCard({
  title,
  category,
  year,
  type = "image",
  src,
  blurSrc,
  width,
  height,
  poster,
  video,
  mediaMode = "natural",
  className = "",
  large = false,
  showYear = true,
}) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const showVideo = type === "video" && video;
  const videoPoster = poster || src;
  const fixedHeight = mediaMode === "fixed-height";
  const aspectRatio = width && height ? `${width} / ${height}` : undefined;
  const mediaFrameClass = fixedHeight
    ? "relative flex h-[58vw] max-h-[560px] min-h-[260px] items-start overflow-hidden sm:h-[50vw] lg:h-[42vw] xl:h-[36vw]"
    : "relative flex overflow-hidden";
  const mediaClass = fixedHeight
    ? "h-full w-full max-w-none object-contain"
    : "h-auto w-full object-contain";
  const altText = title || category || "Проект";

  const playVideo = async () => {
    const el = videoRef.current;
    if (!el || !showVideo) return false;

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    try {
      await el.play();
      setIsVideoPlaying(true);
      return true;
    } catch {
      return false;
    }
  };

  const resetVideo = () => {
    const el = videoRef.current;
    if (!el || !showVideo) return;

    el.pause();
    el.currentTime = 0;
    setIsVideoPlaying(false);
  };

  const handlePointerEnter = (event) => {
    if (event.pointerType !== "mouse") return;
    playVideo();
  };

  const handlePointerLeave = (event) => {
    if (event.pointerType !== "mouse") return;
    resetVideo();
  };

  const toggleVideo = async (event) => {
    event.stopPropagation();

    const el = videoRef.current;
    if (!el || !showVideo) return;

    if (el.paused) {
      await playVideo();
      return;
    }

    el.pause();
    setIsVideoPlaying(false);
  };

  return (
    <motion.article
      className={`group flex flex-col overflow-hidden rounded-sm ${className}`}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      whileHover={{
        y: -6,
        boxShadow: "0 28px 80px rgba(0, 0, 0, 0.34)",
      }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`${mediaFrameClass} bg-graphite-800 bg-cover bg-center`}
        style={{
          aspectRatio,
          backgroundImage: blurSrc ? `url(${blurSrc})` : undefined,
        }}
      >
        {showVideo ? (
          <>
            <motion.video
              ref={videoRef}
              className={mediaClass}
              src={video}
              poster={videoPoster}
              muted
              defaultMuted
              loop
              playsInline
              preload="auto"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
            />
            <button
              type="button"
              aria-label={isVideoPlaying ? "Поставить видео на паузу" : "Воспроизвести видео"}
              className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-graphite-950/75 text-cream shadow-2xl shadow-black/30 backdrop-blur-sm transition-opacity active:scale-95 lg:hidden"
              onClick={toggleVideo}
              onPointerDown={(event) => event.stopPropagation()}
            >
              {isVideoPlaying ? (
                <svg width="19" height="19" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M6.5 4.5V15.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M13.5 4.5V15.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="translate-x-0.5">
                  <path d="M6.5 4.8V15.2L15 10L6.5 4.8Z" fill="currentColor" />
                </svg>
              )}
            </button>
          </>
        ) : (
          <motion.img
            src={src}
            alt={altText}
            width={width}
            height={height}
            className={mediaClass}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      <div
        className={`px-1 pt-2 ${large ? "sm:pt-3" : ""}`}
      >
        <p className="text-[10px] leading-none text-cream-muted/70">
          {showYear && year ? `${category} · ${year}` : category}
        </p>
        {title && (
          <h3
            className={`mt-1 font-display font-medium tracking-tight text-cream/85 ${
              large ? "text-base sm:text-lg" : "text-sm sm:text-base"
            }`}
          >
            {title}
          </h3>
        )}
      </div>
    </motion.article>
  );
}
