'use client';
import React from "react";
import Image from "next/image";

/* ========= Paleta ========= */
const palette = {
  primaryDark: "#590004",
  primary: "#A50104",
  accent: "#FF82A9",
  soft: "#FFC0BE",
  blush: "#FFEBE7",
  paper: "#FFF9EF",
  ink: "#1b1b1b",
};

const links = {
  behanceProfile: "https://www.behance.net/JuraCriativo",
  whatsapp: "https://wa.me/5551998326004?text=Oi%20Ana!%20Vim%20pelo%20site%20e%20quero%20falar%20sobre%20um%20projeto.%20Podemos%20conversar?",
  instagram: "https://www.instagram.com/annaschaeffer_/",
  email: "mailto:anacarolinaschaeffer02@gmail.com",
};

/* ========= Animações utilitárias ========= */
const GlobalAnimations = () => (
  <style jsx global>{`
    :root { --bezier: cubic-bezier(.22,.68,0,1); }
    body {
      background:
        radial-gradient(1200px 600px at 10% -20%, ${palette.blush}66, transparent 60%),
        radial-gradient(900px 600px at 100% 10%, ${palette.soft}55, transparent 60%),
        ${palette.paper};
    }
    .will-reveal { opacity: 0; transform: translateY(16px) scale(.98); transition: opacity .7s var(--bezier), transform .7s var(--bezier), filter .7s var(--bezier); will-change: opacity, transform, filter; filter: saturate(.9); }
    .reveal { opacity: 1 !important; transform: translateY(0) scale(1) !important; filter: saturate(1); }
    @keyframes floaty { 0% { transform: translateY(0) } 50% { transform: translateY(-10px) } 100% { transform: translateY(0) } }
    .floaty { animation: floaty 6s ease-in-out infinite; }
    @keyframes glow { 0% { box-shadow: 0 0 0 0 rgba(255,130,169,.35) } 70% { box-shadow: 0 0 0 14px rgba(255,130,169,0) } 100% { box-shadow: 0 0 0 0 rgba(255,130,169,0) } }
    .glow { animation: glow 2.8s ease-out infinite; }
    @keyframes shift { 0% { background-position: 0% 50% } 50% { background-position: 100% 50% } 100% { background-position: 0% 50% } }
    .animated-gradient { background-image: linear-gradient(90deg, ${palette.accent}, ${palette.soft}, ${palette.blush}); background-size: 200% 200%; animation: shift 8s linear infinite; }
    .nav-link { position: relative; }
    .nav-link::after { content: ""; position: absolute; left: 0; right: 0; bottom: -6px; height: 2px; transform: scaleX(0); transform-origin: left; transition: transform .35s var(--bezier); background: ${palette.accent}; border-radius: 999px; }
    .nav-link:hover::after { transform: scaleX(1); }
    .dot { transition: transform .25s var(--bezier); }
    .dot.active { transform: translateY(-1px); }
  `}</style>
);

/* ========= Reveal ========= */
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          requestAnimationFrame(() => {
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add('reveal');
          });
          obs.unobserve(el);
        }
      }),
      { threshold: 0.15 }
    );
    el.classList.add('will-reveal');
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
};


const Button = ({ href, children }: { href?: string; children: React.ReactNode }) => {
  const cls =
    "inline-flex items-center gap-2 px-5 py-3 rounded-2xl border shadow-lg hover:shadow-2xl transition-all active:scale-[0.98] glow";
  const style: React.CSSProperties = {
    background: `linear-gradient(90deg, ${palette.accent}, ${palette.soft})`,
    borderColor: palette.accent,
    color: palette.primaryDark,
    fontWeight: 800,
    letterSpacing: ".02em",
  };

  const external = !!href && href.startsWith("http");

  return href ? (
    <a
      href={href}
      className={cls}
      style={style}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.primaryDark} strokeWidth="2" className="ml-1">
        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
      </svg>
    </a>
  ) : (
    <button className={cls} style={style}>
      {children}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.primaryDark} strokeWidth="2" className="ml-1">
        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
      </svg>
    </button>
  );
};


/* ========= Section ========= */
const Section: React.FC<{ id?: string; title?: string; subtitle?: string; children: React.ReactNode }> = ({ id, title, subtitle, children }) => (
  <section id={id} className="w-full">
    <div className="mx-auto max-w-6xl px-6 py-20">
      {title && (
        <Reveal>
          <div className="mb-10 drop-shadow-sm">
            <p className="uppercase tracking-[0.35em] text-sm" style={{ color: palette.accent }}>Seção</p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ color: palette.primaryDark }}>{title}</h2>
            {subtitle && <p className="mt-3 text-lg opacity-80" style={{ color: palette.ink }}>{subtitle}</p>}
            <div className="mt-6 h-[3px] w-32 rounded-full animated-gradient shadow-md" />
          </div>
        </Reveal>
      )}
      {children}
    </div>
  </section>
);

/* ========= Navbar ========= */
const Navbar: React.FC = () => {
  const items = [
    { href: "#about", label: "Sobre" },
    { href: "#services", label: "Serviços" },
    { href: "#experience", label: "Diferenciais" },
    { href: "#projects", label: "Projetos" },
    { href: "#behance", label: "Behance" },
    { href: "#education", label: "Educação" },
    { href: "#contact", label: "Contato" },
  ];
  return (
    <header
      className="fixed top-0 inset-x-0 z-50 shadow-2xl backdrop-blur-xl"
      style={{ background: `${palette.paper}F2`, borderBottom: `2px solid ${palette.blush}` }}
    >
      <div className="mx-auto max-w-6xl px-6 h-20 flex items-center justify-between">
        <a href="#home" className="text-2xl font-black tracking-tight drop-shadow" style={{ color: palette.primary }}>
          Ana <span style={{ color: palette.accent }}>Schaeffer</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-base font-medium">
          {items.map((it, i) => (
            <a key={it.href} href={it.href} className="nav-link hover:opacity-90 drop-shadow-sm"
              style={{ color: palette.ink, transitionDelay: `${i * 20}ms` }}>
              {it.label}
            </a>
          ))}
          <a
            href={links.behanceProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-5 py-2 rounded-full border shadow-lg hover:shadow-2xl transition-all"
            style={{ borderColor: palette.accent, color: palette.primaryDark, background: palette.blush }}
          >
            Behance
          </a>
        </nav>
      </div>
    </header>
  );
};

/* ========= Hero ========= */
const Hero: React.FC = () => (
  <section id="home" className="pt-28" style={{ background: palette.paper }}>
    <div className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
      <Reveal>
        <div>
          <p className="uppercase tracking-[0.35em] text-xs mb-3" style={{ color: palette.primary }}>
            Ana Carolina | Design, Moda & Marketing
          </p>
          <h1 className="text-4xl md:text-6xl font-black leading-[1.05]" style={{ color: palette.primaryDark }}>
            Transformo criatividade em estratégia para potencializar marcas e ideias.
          </h1>
          <p className="mt-5 text-lg md:text-xl opacity-90" style={{ color: palette.ink }}>
            Clique abaixo e fale comigo agora mesmo!
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="#contact">Fale comigo agora</Button>
            <a
              href="#services"
              className="px-5 py-3 rounded-2xl border shadow-lg hover:shadow-2xl transition-all"
              style={{ borderColor: palette.primary, color: palette.primary, background: `${palette.blush}66` }}
            >
              Ver serviços
            </a>
            <a
              href={links.behanceProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl border shadow-lg hover:shadow-2xl transition-all"
              style={{ borderColor: palette.accent, color: palette.primaryDark, background: palette.paper }}
            >
              Ver no Behance
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="relative">
          <div className="absolute -z-10 inset-0 blur-3xl opacity-60 animated-gradient rounded-[36px]" />
          <div
            className="aspect-[4/5] w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl floaty"
            style={{ background: palette.blush }}
          >
            <div className="relative aspect-[4/5] w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl floaty" style={{ background: palette.blush }}>
              <Image
                src="/images/profile.jpg"
                alt="Ana Carolina"
                fill
                sizes="(max-width: 768px) 90vw, 400px"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div
            className="absolute right-1/2 translate-x-1/2 md:right-4 md:translate-x-0 -bottom-4 px-4 py-2 rounded-xl text-sm shadow-md"
            style={{ background: palette.accent, color: palette.primaryDark, fontWeight: 700 }}
          >
            Disponível p/ projetos
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ========= About ========= */
const About: React.FC = () => (
  <Section id="about" title="Sobre mim" subtitle="Quem sou">
    <div className="grid md:grid-cols-2 gap-10">
      <Reveal>
        <p className="leading-7" style={{ color: palette.ink }}>
          Sou formada em Design de Moda pela Universidade Dinâmica das Cataratas e atualmente curso
          Pós-Graduação em Marketing de Moda e Beleza pela ESPM. Minha trajetória une a estética da moda
          à força do marketing digital, entregando resultados que conectam identidade, estilo e impacto.
        </p>
      </Reveal>
      <Reveal delay={100}>
        <div className="rounded-2xl p-6 shadow-xl border hover:shadow-2xl transition-shadow"
          style={{ background: palette.blush, borderColor: palette.soft }}>
          <h3 className="font-bold mb-2" style={{ color: palette.primaryDark }}>Posicionamento</h3>
          <p style={{ color: palette.ink }}>
            Portfólio diverso em moda, design e marketing. Olhar criativo aliado a estratégias reais que geram resultados.
          </p>
        </div>
      </Reveal>
    </div>
  </Section>
);

const services = [
  {
    title: "Gerenciamento de Mídias Sociais",
    desc: "Planejamento, criação de conteúdo e estratégias para engajar e converter.",
    img: "/images/projects/facoporvoce.jpeg",
  },
  {
    title: "Design Gráfico & Identidade Visual",
    desc: "Artes profissionais, branding e desenvolvimento visual que fortalecem sua marca.",
    img: "/images/projects/facoporvoce2.jpeg",
  },
  {
    title: "Moda & Produto",
    desc: "Pesquisa de tendências, desenvolvimento de coleções, fichas técnicas e suporte criativo para marcas de moda.",
    img: "/images/projects/facoporvoce3.jpeg",
  },
];

const Services: React.FC = () => (
  <Section id="services" title="O que eu faço por você" subtitle="Como posso ajudar sua marca">
    <div className="grid md:grid-cols-3 gap-6">
      {services.map((s, i) => (
        <Reveal key={i} delay={i * 60}>
          <div
            className="rounded-2xl overflow-hidden border shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 bg-white"
            style={{ borderColor: palette.soft }}
          >
            <img
              src={s.img}
              alt={s.title}
              className="w-full h-110 object-contain"
            />
            <div className="p-6">
              <div className="text-xl font-bold mb-2" style={{ color: palette.primary }}>
                {s.title}
              </div>
              <p style={{ color: palette.ink }}>{s.desc}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
);



/* ========= Diferenciais ========= */
const differentiators = [
  "O que me move é transformar ideias em marcas que emocionam.",
  "Sou formada em Design de Moda, faço pós-graduação em Marketing de Moda e Beleza e atuo como designer gráfica em múltiplos segmentos.",
  "Estou sempre em busca de aprender mais, porque acredito que o design vai além da estética: é sobre criar conexões verdadeiras entre marcas e pessoas.",
];
const Experience: React.FC = () => (
  <Section id="experience" title="Por que trabalhar comigo?" subtitle="Meus diferenciais">
    <ul className="grid md:grid-cols-3 gap-6">
      {differentiators.map((d, i) => (
        <Reveal key={d} delay={i * 70}>
          <li
            className="rounded-2xl p-6 border shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
            style={{ background: palette.blush, borderColor: palette.soft }}
          >
            <p style={{ color: palette.ink }}>{d}</p>
          </li>
        </Reveal>
      ))}
    </ul>
  </Section>
);

/* ========= Carousel (cards locais) ========= */
const Carousel: React.FC<{ images: string[]; alt?: string; className?: string; }> = ({ images, alt = "Imagem do projeto", className }) => {
  const [idx, setIdx] = React.useState(0);
  const total = images.length || 1;
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);
  const go = (i: number) => setIdx(i);

  return (
    <div className={`relative ${className || ""}`}>
      <div className="aspect-[4/5] w-full overflow-hidden rounded-xl shadow-lg bg-white">
        <div className="relative w-full h-full">
          <Image
            src={images[idx]}
            alt={alt}
            fill
            sizes="(max-width: 768px) 90vw, 400px"
            className="object-cover transition-all duration-300"
          />
        </div>

      </div>
      <button
        aria-label="Anterior"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full px-3 py-2 border shadow-md hover:shadow-lg active:scale-95"
        style={{ background: palette.paper, borderColor: palette.soft, color: palette.primaryDark }}
      >
        ‹
      </button>
      <button
        aria-label="Próxima"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-3 py-2 border shadow-md hover:shadow-lg active:scale-95"
        style={{ background: palette.paper, borderColor: palette.soft, color: palette.primaryDark }}
      >
        ›
      </button>
      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Ir para slide ${i + 1}`}
            className={`dot h-2.5 rounded-full transition-all ${i === idx ? "w-6 active" : "w-2.5"}`}
            style={{ background: i === idx ? palette.accent : palette.soft }}
          />
        ))}
      </div>
    </div>
  );
};

/* ========= Dados dos projetos (locais) ========= */
const projectsData = [
  {
    title: "ARISSÁ – coleção & direção criativa",
    desc: "Editorial de moda, detalhes e modelagem.",
    images: [
      "/images/projects/id-visual/Instagrampost-27.png",
      "/images/projects/id-visual/Instagram post - 28.png",
      "/images/projects/id-visual/Instagram post - 29.png",
      "/images/projects/id-visual/Instagram post - 30.png",
      "/images/projects/id-visual/Instagram post - 32.png",
      "/images/projects/id-visual/Instagram post - 33.png",
      "/images/projects/id-visual/Instagram post - 34.png",
    ],
  },

  {
    title: "TRIÔOH – Identidade Visual & Branding",
    desc: "Desenvolvimento de logo, identidade visual e aplicações estratégicas de marca.",
    images: [
      "/images/projects/triooh/tricoh.jpg",
      "/images/projects/triooh/trico2.jpg",
      "/images/projects/triooh/trico3.jpg",
    ],
  },
  {
    title: "KIRU – Fotografia, embalagens & identidade",
    desc: "Crio projetos que vão do editorial de moda à direção fotográfica de produtos, desenvolvendo embalagens exclusivas e explorando a identidade visual aplicada em diferentes formatos.",
    images: [
      "/images/projects/kiru/kiru.jpg",
      "/images/projects/kiru/kiru (2).jpg",
      "/images/projects/kiru/kiru3.jpg",
      "/images/projects/kiru/kiru4.jpg",
    ],
  },
];

/* ========= Projetos (cards maiores) ========= */
const Projects: React.FC = () => (
  <Section id="projects" title="Projetos" subtitle="Alguns destaques recentes">
    <div className="grid md:grid-cols-3 gap-6">
      {projectsData.map((p, i) => (
        <Reveal key={p.title} delay={i * 80}>
          <div
            className="rounded-2xl border shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 bg-white/70 min-h-[520px]"
            style={{ borderColor: palette.soft, background: palette.paper }}
          >
            <Carousel images={p.images} alt={p.title} />
            <div className="p-6">
              <a href={links.instagram} target="_blank" rel="noopener noreferrer">
                <h3 className="font-bold hover:underline" style={{ color: palette.primaryDark }}>{p.title}</h3>
              </a>
              <p className="text-base opacity-80" style={{ color: palette.ink }}>{p.desc}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
);

/* ========= Behance (EMBED OFICIAL) ========= */
/* IDs enviados por você */
const behanceEmbedIds = [
  "233346493", // Direito Agro — Social Media
  "233340281", // Pediatria — Social Media
  "233336459", // ID Visual — Nutricionista
  "233335995", // Logo — Quiropraxia
  "233334769", // ID Visual — Dermi Sant
  "202331151", // Manual de Marca — Emília Gama
];

/* Componente de iframe responsivo (sem warnings) */
const BehanceEmbedCard: React.FC<{ id: string; highlight?: boolean }> = ({ id, highlight }) => (
  <div
    className={`rounded-2xl border transition-all overflow-hidden bg-white/80
                ${highlight ? "scale-[1.06] shadow-2xl z-10" : "scale-[0.96] shadow-lg opacity-95"}
                w-[72vw] sm:w-[420px] lg:w-[420px]`}
    style={{ borderColor: palette.soft, background: palette.paper }}
  >
    {/* Altura ajustada para evitar scroll interno; sem barras */}
    <div style={{ position: "relative", width: "100%", height: "340px" }}>
      <iframe
        src={`https://www.behance.net/embed/project/${id}?ilo0=1`}
        loading="lazy"
        allow="clipboard-write; fullscreen"
        allowFullScreen
        scrolling="no"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: 0,
          overflow: "hidden",
        }}
        title={`Behance project ${id}`}
      />
    </div>
  </div>
);



const BehanceEmbedCarousel: React.FC = () => {
  const ids = behanceEmbedIds;
  const VISIBLE = 3;
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const cardRef = React.useRef<HTMLDivElement | null>(null);

  // usamos índice "virtual" que pode passar dos limites
  const [virtualIndex, setVirtualIndex] = React.useState(VISIBLE); // começa no primeiro bloco do clone
  const [step, setStep] = React.useState(0);

  // array duplicado (clone antes e depois)
  const extended = [...ids, ...ids, ...ids]; // triplica
  const base = ids.length;
  const start = base; // offset inicial

  React.useEffect(() => {
    const measure = () => {
      const card = cardRef.current;
      const track = trackRef.current;
      if (!card || !track) return;
      const cardWidth = card.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).columnGap || "24") || 24;
      setStep(cardWidth + gap);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const prev = () => setVirtualIndex((i) => i - 1);
  const next = () => setVirtualIndex((i) => i + 1);
  const go = (i: number) => setVirtualIndex(start + i);

  // centraliza o índice atual
  const translate = step ? -(virtualIndex - Math.floor(VISIBLE / 2)) * step : 0;

  // reposiciona sem animação se passarmos do clone
  React.useEffect(() => {
    if (virtualIndex < base) {
      // passou para trás
      setTimeout(() => setVirtualIndex((i) => i + base), 0);
    } else if (virtualIndex >= base * 2) {
      // passou para frente
      setTimeout(() => setVirtualIndex((i) => i - base), 0);
    }
  }, [virtualIndex, base]);

  // highlight: pega índice real dentro do bloco do meio
  const realIndex = (virtualIndex - start + base) % base;

  return (
    <Section id="behance" title="Identidades Visuais & Branding" >
      <Reveal>
        <div className="mb-6 flex items-center justify-between gap-3">
          <a
            href={links.behanceProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border shadow-lg hover:shadow-2xl transition-all"
            style={{ borderColor: palette.accent, color: palette.primaryDark, background: palette.blush }}
          >
            Ver perfil completo
          </a>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={prev} aria-label="Anterior"
              className="rounded-full px-3 py-2 border shadow-md hover:shadow-lg active:scale-95"
              style={{ background: palette.paper, borderColor: palette.soft, color: palette.primaryDark }}>‹</button>
            <button onClick={next} aria-label="Próximo"
              className="rounded-full px-3 py-2 border shadow-md hover:shadow-lg active:scale-95"
              style={{ background: palette.paper, borderColor: palette.soft, color: palette.primaryDark }}>›</button>
          </div>
        </div>
      </Reveal>

      <div className="relative overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-stretch gap-6 will-change-transform"
          style={{
            transform: `translateX(${translate}px)`,
            transition: "transform .6s var(--bezier)",
          }}
        >
          {extended.map((id, i) => {
            const highlight = i === virtualIndex;
            return (
              <div key={`${id}-${i}`} ref={i === start ? cardRef : undefined} className="shrink-0">
                <BehanceEmbedCard id={id} highlight={highlight} />
              </div>
            );
          })}
        </div>

        {/* dots controlam índice real */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {ids.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Ir para ${i + 1}`}
              className={`dot h-2.5 rounded-full transition-all ${i === realIndex ? "w-6 active" : "w-2.5"}`}
              style={{ background: i === realIndex ? palette.accent : palette.soft }}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};


/* ========= Educação ========= */
const Education: React.FC = () => (
  <Section id="education" title="Educação" subtitle="Formação acadêmica">
    <div className="grid md:grid-cols-2 gap-6">
      <Reveal>
        <div className="rounded-2xl p-6 border shadow-lg hover:shadow-2xl transition-all"
          style={{ borderColor: palette.soft, background: palette.blush }}>
          <h3 className="font-bold" style={{ color: palette.primaryDark }}>Design de Moda</h3>
          <p className="opacity-80" style={{ color: palette.ink }}>Universidade Dinâmica das Cataratas</p>
        </div>
      </Reveal>
      <Reveal delay={100}>
        <div className="rounded-2xl p-6 border shadow-lg hover:shadow-2xl transition-all"
          style={{ borderColor: palette.soft, background: palette.blush }}>
          <h3 className="font-bold" style={{ color: palette.primaryDark }}>Pós em Marketing de Moda & Beleza</h3>
          <p className="opacity-80" style={{ color: palette.ink }}>ESPM</p>
        </div>
      </Reveal>
    </div>
  </Section>
);

/* ========= Contato ========= */
const Contact: React.FC = () => (
  <Section id="contact" title="Contato" subtitle="Vamos criar juntos a próxima história da sua marca?">
    <div className="grid md:grid-cols-2 gap-10">
      <Reveal>
        <div
          className="rounded-3xl p-8 shadow-2xl border relative overflow-hidden"
          style={{ borderColor: palette.soft, background: `linear-gradient(135deg, ${palette.accent}33, ${palette.soft}66)` }}
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-60 animated-gradient" />
          <h3 className="text-2xl font-black mb-2" style={{ color: palette.primaryDark }}>
            Vamos conversar?
          </h3>
          <p className="mb-6" style={{ color: palette.ink }}>
            Me chame no e-mail ou WhatsApp. Respondo rapidinho ✨
          </p>

          <div className="flex flex-wrap gap-3">
            <Button href={links.email}>Falar por e-mail</Button>
            <a
              href={links.whatsapp}
              className="px-5 py-3 rounded-2xl border shadow-lg hover:shadow-2xl transition-all"
              style={{ borderColor: palette.primary, color: palette.primary, background: palette.paper }}
            >
              WhatsApp
            </a>
            <a
              href={links.instagram}
              className="px-5 py-3 rounded-2xl border shadow-lg hover:shadow-2xl transition-all"
              style={{ borderColor: palette.accent, color: palette.primaryDark, background: palette.blush }}
            >
              Instagram
            </a>
            <a
              href={links.behanceProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl border shadow-lg hover:shadow-2xl transition-all"
              style={{ borderColor: palette.accent, color: palette.primaryDark, background: `${palette.blush}AA` }}
            >
              Behance
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <form
          className="rounded-3xl p-6 border grid gap-4 shadow-2xl"
          style={{ borderColor: palette.soft, background: palette.blush }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              required
              placeholder="Seu nome"
              className="px-4 py-3 rounded-xl outline-none shadow-inner"
              style={{ background: palette.paper, border: `1px solid ${palette.soft}` }}
            />
            <input
              required
              type="email"
              placeholder="Seu e-mail"
              className="px-4 py-3 rounded-xl outline-none shadow-inner"
              style={{ background: palette.paper, border: `1px solid ${palette.soft}` }}
            />
          </div>
          <input
            placeholder="Assunto (opcional)"
            className="px-4 py-3 rounded-xl outline-none shadow-inner"
            style={{ background: palette.paper, border: `1px solid ${palette.soft}` }}
          />
          <textarea
            required
            placeholder="Mensagem"
            rows={5}
            className="px-4 py-3 rounded-xl outline-none shadow-inner"
            style={{ background: palette.paper, border: `1px solid ${palette.soft}` }}
          />
          <div className="flex items-center gap-3">
            <input type="checkbox" id="consent" className="accent-pink-500" />
            <label htmlFor="consent" className="text-sm" style={{ color: palette.ink }}>
              Autorizo contato para retorno da mensagem.
            </label>
          </div>
          <Button>Enviar mensagem</Button>
        </form>
      </Reveal>
    </div>
  </Section>
);

/* ========= Footer ========= */
const Footer: React.FC = () => (
  <footer className="py-12 text-center shadow-inner" style={{ background: palette.paper, color: palette.ink }}>
    <div className="mx-auto max-w-6xl px-6">
      <div className="h-[2px] w-full mb-6 animated-gradient rounded-full" />
      <p className="opacity-80">
        © {new Date().getFullYear()} Ana Carolina. Feito com ♥. —
        <a href={links.behanceProfile} target="_blank" rel="noopener noreferrer" className="ml-2 underline nav-link" style={{ color: palette.primary }}>
          Portfólio no Behance
        </a>
      </p>
    </div>
  </footer>
);

/* ========= Page ========= */
export default function PortfolioPage() {
  return (
    <main
      style={{
        background: palette.paper,
        color: palette.ink,
        fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      }}
    >
      <GlobalAnimations />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Experience />
      <Projects />
      <BehanceEmbedCarousel /> {/* ← carrossel horizontal com iframes oficiais */}
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
