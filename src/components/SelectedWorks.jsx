import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { selectedWorks } from "../data/projects";

const caseText =
  "Задача проекта — разработать яркий рекламный макет для зимней кампании торгово-развлекательного центра. Основной фокус был на привлечении посетителей на сезонные активности: бесплатный каток, кино, шопинг и праздничные мероприятия, включая большую Масленицу.";

const solutionText =
  "Визуальное решение построено на контрасте с зимней городской средой: насыщенный красный фон, крупная типографика и эмоциональный образ героини в русском народном костюме делают макет заметным издалека. Макет должен был хорошо считываться на дороге, быстро привлекать внимание водителей и пешеходов даже в серую снежную погоду.";

const tennisIntroText =
  "Разработка визуальной системы для брендирования теннисных и падел-кортов в фирменном стиле компании. В кейсе собраны разные форматы размещения на кортах, так как компания развивает присутствие в спортивных пространствах, где находится целевая аудитория.";

const tennisIntegrationText =
  "Важно было аккуратно интегрировать бренд в среду: сделать коммуникацию заметной и понятной, но не навязчивой. Зритель должен быстро считать, какой жилой комплекс рекламируется, при этом тема тенниса и атмосфера корта должны оставаться главными.";

const tennisSystemText =
  "Визуальный язык строится на сочетании эстетики бизнес-жилья и премиального хобби: спорт, стиль, статус и современный образ жизни. Баннеры, роллапы, брендированные мячи и lifestyle-контент работают как единая система и помогают бренду естественно присутствовать в среде аудитории.";

const terraceIntroText =
  "Единая рекламная кампания для нескольких жилых комплексов девелопера. Концепция масштабировалась на разные города и объекты с использованием единого визуального языка и рекламного сообщения. Ключевые визуалы созданы с использованием AI-инструментов.";

const terraceSceneText =
  "В основе сцен — реальная терраса жилого комплекса, интегрированная в lifestyle-сюжеты для усиления эмоционального восприятия предложения.";

const terraceAdaptationText =
  "Серия адаптировалась под новые проекты и рекламные поверхности — от билбордов и цифровых экранов до социальных сетей и печатной продукции. Основной задачей было сохранить узнаваемость и целостность кампании торгового предложения.";

const motionIntroText =
  "Создаю анимационные материалы для веб-форматов, социальных сетей и наружных digital-экранов в городской среде. В работе учитываю особенности каждого носителя: длительность контакта со зрителем, расстояние считывания, темп движения, читаемость текста и визуальную нагрузку.";

const motionSystemText =
  "Я использую крупную типографику, выразительные переходы, акцентное движение и понятную последовательность кадров. Анимация помогает усилить визуальный образ кампании, удержать внимание зрителя и сделать коммуникацию более живой.";

const verticalSlides = [1, 2, 3, 4].map(
  (index) => `${import.meta.env.BASE_URL}works/marco-mall-240x400-${index}.png`,
);

const workAsset = (path) => `${import.meta.env.BASE_URL}works/${path}`;

const mainVisual =
  selectedWorks.find((work) => work.id.includes("масленица-молл")) ||
  selectedWorks.find((work) => work.id.includes("молл")) ||
  selectedWorks[0];

const mockupVisual =
  selectedWorks.find((work) => work.id.includes("масленица-привязка")) ||
  selectedWorks.find((work) => work.id.includes("молл")) ||
  selectedWorks[1];

const tennisVisuals = {
  hero: {
    src: workAsset("tennis-courts/padel-stretch.png"),
    title: "Баннер для брендирования падел-корта",
    width: 6243,
    height: 1158,
  },
  lifestyle: {
    src: workAsset("tennis-courts/lifestyle-player.png"),
    title: "Lifestyle-баннер на теннисном корте",
    width: 814,
    height: 1209,
  },
  rollup: {
    src: workAsset("tennis-courts/rollup-feelings.png"),
    title: "Роллап для кампании Мармакс",
    width: 908,
    height: 1601,
  },
  balls: {
    src: workAsset("tennis-courts/branded-balls.png"),
    title: "Брендированные теннисные мячи Мармакс",
    width: 1301,
    height: 1627,
  },
  marmaxBanner: {
    src: workAsset("tennis-courts/marmax-banner.png"),
    title: "Горизонтальный баннер Мармакс",
    width: 2525,
    height: 320,
  },
  victoryBanner: {
    src: workAsset("tennis-courts/victory-territory.png"),
    title: "Горизонтальный баннер Территория побед",
    width: 2525,
    height: 320,
  },
};

const terraceVisuals = {
  main: {
    src: workAsset("terrace-campaign/terrace-main.png"),
    title: "Квартиры с террасами",
    width: 6000,
    height: 3077,
  },
  outdoor: {
    src: workAsset("terrace-campaign/terrace-outdoor.png"),
    title: "Адаптация кампании для наружной рекламы",
    width: 1536,
    height: 948,
  },
  motion: {
    src: workAsset("terrace-campaign/terrace-motion.mp4"),
    title: "Motion-адаптация кампании квартир с террасами",
    width: 1824,
    height: 544,
  },
};

const motionVisuals = {
  holland: {
    src: workAsset("motion-campaign/holland-motion.mp4"),
    title: "Motion-ролик для наружного digital-экрана",
    width: 1440,
    height: 720,
  },
  coton: {
    src: workAsset("motion-campaign/coton-motion.mp4"),
    title: "Motion-ролик для fashion-кампании",
    width: 1440,
    height: 720,
  },
  zarina: {
    src: workAsset("motion-campaign/zarina-motion.mp4"),
    title: "Motion-ролик для fashion-кампании Zarina",
    width: 1440,
    height: 720,
  },
};

const otherVisuals = {
  posters: {
    src: workAsset("other-works/poster-wall.png"),
    title: "Постеры сериалов в рамах",
    width: 1536,
    height: 748,
  },
  laptop: {
    src: workAsset("other-works/laptop-ad.png"),
    title: "Digital-макет на ноутбуке",
    width: 1059,
    height: 867,
  },
  springShopping: {
    src: workAsset("other-works/spring-shopping.png"),
    title: "Наружная реклама Весна, шопинг, праздники",
    width: 1536,
    height: 1024,
  },
  illustrations: {
    src: workAsset("other-works/illustrations.png"),
    title: "Иллюстрации для печатного материала",
    width: 1064,
    height: 1478,
  },
};

function ImageBlock({ image, className = "", imgClassName = "object-cover" }) {
  return (
    <div className={`overflow-hidden bg-transparent ${className}`}>
      <img
        src={image.src}
        alt={image.title || "Проект"}
        width={image.width}
        height={image.height}
        className={`h-full w-full ${imgClassName}`}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function VideoBlock({ video, className = "", videoClassName = "object-cover" }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    element.muted = true;
    element.defaultMuted = true;
    element.setAttribute("muted", "");
    element.setAttribute("playsinline", "");
    element.setAttribute("webkit-playsinline", "");

    const playVideo = () => {
      element.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) playVideo();
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    playVideo();

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`overflow-hidden bg-transparent ${className}`}>
      <video
        ref={videoRef}
        src={video.src}
        width={video.width}
        height={video.height}
        className={`h-full w-full ${videoClassName}`}
        title={video.title}
        autoPlay
        muted
        defaultMuted
        loop
        controls
        playsInline
        preload="auto"
        onLoadedMetadata={(event) => {
          event.currentTarget.muted = true;
          event.currentTarget.play().catch(() => {});
        }}
        onCanPlay={(event) => {
          event.currentTarget.muted = true;
          event.currentTarget.play().catch(() => {});
        }}
      />
    </div>
  );
}

function RotatingImageBlock({ images, className = "" }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % images.length);
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className={`relative overflow-hidden bg-transparent ${className}`}>
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt="Вертикальный digital-формат кампании Марко Молл"
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
        />
      ))}
    </div>
  );
}

export default function SelectedWorks() {
  return (
    <section id="works" className="section-padding pb-10 pt-6 sm:pb-12 sm:pt-8 lg:pb-14 lg:pt-10">
      <div className="mx-auto max-w-[1600px]">
        <ScrollReveal delay={0.1} y={24}>
          <div className="mb-8 grid gap-4 sm:mb-10 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <h2 className="font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl">
                Сезонная кампания
              </h2>
              <p className="mt-8 max-w-[1120px] text-lg leading-relaxed text-cream-muted">
                {caseText}
              </p>
            </div>
            <p className="font-display text-2xl font-semibold text-cream-muted sm:text-3xl">
              Марко Молл
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.16} y={24}>
          <ImageBlock
            image={mainVisual}
            className="aspect-[2/1] w-full"
            imgClassName="object-contain"
          />
        </ScrollReveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.32fr_0.68fr] lg:items-start xl:gap-12">
          <ScrollReveal delay={0.18} y={24}>
            <RotatingImageBlock images={verticalSlides} className="aspect-[898/1497] w-full" />
          </ScrollReveal>

          <div className="grid gap-8">
            <ScrollReveal delay={0.2} y={24}>
              <ImageBlock
                image={mockupVisual}
                className="aspect-[1693/929] w-full"
                imgClassName="object-contain"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.22} y={24}>
              <div className="max-w-3xl text-lg leading-relaxed text-cream-muted">
                <p>
                  {solutionText}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-24">
          <ScrollReveal delay={0.1} y={24}>
            <div className="mb-8 grid gap-4 sm:mb-10 lg:grid-cols-[1fr_auto] lg:items-start">
              <div>
                <h3 className="font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl">
                  Брендирование теннисных кортов
                </h3>
                <p className="mt-8 max-w-[1120px] text-lg leading-relaxed text-cream-muted">
                  {tennisIntroText}
                </p>
              </div>
              <p className="font-display text-2xl font-semibold text-cream-muted sm:text-3xl">
                Мармакс
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.14} y={24}>
            <ImageBlock
              image={tennisVisuals.hero}
              className="aspect-[6243/1158] w-full"
              imgClassName="object-contain"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.16} y={24}>
            <p className="mt-8 max-w-[1280px] text-lg leading-relaxed text-cream-muted">
              {tennisIntegrationText}
            </p>
          </ScrollReveal>

          <div className="mt-8 grid gap-8 md:grid-cols-3 xl:gap-12">
            <ScrollReveal delay={0.18} y={24}>
              <ImageBlock
                image={tennisVisuals.lifestyle}
                className="h-[520px] w-full sm:h-[640px] lg:h-[760px] xl:h-[820px]"
                imgClassName="object-cover"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2} y={24}>
              <ImageBlock
                image={tennisVisuals.rollup}
                className="h-[520px] w-full sm:h-[640px] lg:h-[760px] xl:h-[820px]"
                imgClassName="object-cover"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.22} y={24}>
              <ImageBlock
                image={tennisVisuals.balls}
                className="h-[520px] w-full sm:h-[640px] lg:h-[760px] xl:h-[820px]"
                imgClassName="object-cover"
              />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.24} y={24}>
            <p className="mt-8 max-w-[1280px] text-lg leading-relaxed text-cream-muted">
              {tennisSystemText}
            </p>
          </ScrollReveal>

          <div className="mt-8 grid gap-8">
            <ScrollReveal delay={0.26} y={24}>
              <ImageBlock
                image={tennisVisuals.marmaxBanner}
                className="aspect-[2525/320] w-full"
                imgClassName="object-contain"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.28} y={24}>
              <ImageBlock
                image={tennisVisuals.victoryBanner}
                className="aspect-[2525/320] w-full"
                imgClassName="object-contain"
              />
            </ScrollReveal>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-24">
          <ScrollReveal delay={0.1} y={24}>
            <div className="mb-8 grid gap-4 sm:mb-10 lg:grid-cols-[1fr_auto] lg:items-start">
              <div>
                <h3 className="font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl">
                  Рекламная кампания
                </h3>
                <div className="mt-8 max-w-[1120px] space-y-4 text-lg leading-relaxed text-cream-muted">
                  <p>{terraceIntroText}</p>
                  <p>{terraceSceneText}</p>
                </div>
              </div>
              <p className="font-display text-2xl font-semibold text-cream-muted sm:text-3xl">
                Мармакс
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.14} y={24}>
            <ImageBlock
              image={terraceVisuals.main}
              className="aspect-[6000/3077] w-full"
              imgClassName="object-contain"
            />
          </ScrollReveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.54fr_0.46fr] lg:items-start xl:gap-12">
            <ScrollReveal delay={0.18} y={24}>
              <ImageBlock
                image={terraceVisuals.outdoor}
                className="aspect-[1536/948] w-full"
                imgClassName="object-cover"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2} y={24}>
              <div className="max-w-[520px] text-lg leading-relaxed text-cream-muted">
                <p>{terraceAdaptationText}</p>
                <p className="mt-8 font-semibold text-cream">
                  Более 70 адаптаций для наружной рекламы, digital, печатных материалов и
                  indoor-носителей.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.24} y={24}>
            <VideoBlock
              video={terraceVisuals.motion}
              className="mt-8 aspect-[1824/544] w-full"
              videoClassName="object-cover"
            />
          </ScrollReveal>
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-24">
          <ScrollReveal delay={0.1} y={24}>
            <div className="mb-8 sm:mb-10">
              <h3 className="font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl">
                Анимации и motion
              </h3>
              <p className="mt-8 max-w-[1280px] text-lg leading-relaxed text-cream-muted">
                {motionIntroText}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.14} y={24}>
            <VideoBlock
              video={motionVisuals.holland}
              className="aspect-[1440/720] w-full"
              videoClassName="object-cover"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.18} y={24}>
            <p className="mt-8 max-w-[1280px] text-lg leading-relaxed text-cream-muted">
              {motionSystemText}
            </p>
          </ScrollReveal>

          <div className="mt-8 grid gap-8 md:grid-cols-2 xl:gap-12">
            <ScrollReveal delay={0.2} y={24}>
              <VideoBlock
                video={motionVisuals.coton}
                className="aspect-[1440/720] w-full"
                videoClassName="object-cover"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.22} y={24}>
              <VideoBlock
                video={motionVisuals.zarina}
                className="aspect-[1440/720] w-full"
                videoClassName="object-cover"
              />
            </ScrollReveal>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-24">
          <ScrollReveal delay={0.1} y={24}>
            <h3 className="mb-8 font-display text-3xl font-semibold leading-tight text-cream sm:mb-10 sm:text-4xl">
              Другие работы
            </h3>
          </ScrollReveal>

          <ScrollReveal delay={0.14} y={24}>
            <ImageBlock
              image={otherVisuals.posters}
              className="aspect-[1536/748] w-full"
              imgClassName="object-cover"
            />
          </ScrollReveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.32fr_0.44fr_0.24fr] lg:items-stretch xl:gap-12">
            <ScrollReveal delay={0.18} y={24}>
              <ImageBlock
                image={otherVisuals.laptop}
                className="h-[360px] w-full sm:h-[420px] lg:h-[380px] xl:h-[430px]"
                imgClassName="object-cover"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2} y={24}>
              <ImageBlock
                image={otherVisuals.springShopping}
                className="h-[360px] w-full sm:h-[420px] lg:h-[380px] xl:h-[430px]"
                imgClassName="object-cover"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.22} y={24}>
              <ImageBlock
                image={otherVisuals.illustrations}
                className="h-[360px] w-full sm:h-[420px] lg:h-[380px] xl:h-[430px]"
                imgClassName="object-cover"
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
