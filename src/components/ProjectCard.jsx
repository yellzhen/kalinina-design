import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);
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

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !showVideo) return;
    if (isHovered) el.play().catch(() => {});
    else {
      el.pause();
      el.currentTime = 0;
    }
  }, [isHovered, showVideo]);

  return (
    <motion.article
      className={`group flex flex-col overflow-hidden rounded-sm ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          <motion.video
            ref={videoRef}
            className={mediaClass}
            src={video}
            poster={videoPoster}
            muted
            loop
            playsInline
            preload="metadata"
          />
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
