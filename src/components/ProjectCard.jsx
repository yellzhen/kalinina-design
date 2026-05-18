import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ProjectCard({
  title,
  category,
  year,
  type = "image",
  src,
  poster,
  video,
  className = "",
  large = false,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const showVideo = type === "video" && video;
  const videoPoster = poster || src;
  const mediaFrameClass = showVideo
    ? "relative flex overflow-hidden"
    : "relative flex overflow-hidden";

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
      <div className={mediaFrameClass}>
        {showVideo ? (
          <motion.video
            ref={videoRef}
            className="h-auto w-full object-contain"
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
            alt={title}
            className="h-auto w-full object-contain"
            loading="lazy"
          />
        )}
      </div>

      <div
        className={`px-1 pt-2 ${large ? "sm:pt-3" : ""}`}
      >
        <p className="text-[10px] leading-none text-cream-muted/70">
          {category} · {year}
        </p>
        <h3
          className={`mt-1 font-display font-medium tracking-tight text-cream/85 ${
            large ? "text-base sm:text-lg" : "text-sm sm:text-base"
          }`}
        >
          {title}
        </h3>
      </div>
    </motion.article>
  );
}
