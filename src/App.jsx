import { useState, useEffect } from "react";

const PERFUMES = [
  {
    id: 1,
    name: "NOIR ABSOLU",
    tagline: "Darkness wears a scent",
    price: "$320",
    notes: ["Oud", "Black Rose", "Amber"],
    accent: "#2a2a2a",
    accentLight: "#8a7a6a",
    highlight: "#95c94c",
    image: "images/—Pngtree—luxury fragrance bottle with green_19340163.png",
    description: "A deep, smoky journey through ancient Arabian souks. Oud and black rose entwined in eternal darkness.",
    longDescription: "NOIR ABSOLU is the olfactory equivalent of twilight in the ancient city. Opening with a burst of rare Omani oud, the heart reveals a devastating black rose — petals steeped in darkness, thorns kissed by amber resin. The dry-down is an intimate whisper of smoky vetiver and sandalwood that clings to skin for hours. This is a fragrance for those who understand that true luxury is felt, not seen.",
    topNotes: ["Oud", "Black Pepper", "Bergamot"],
    heartNotes: ["Black Rose", "Dark Iris", "Saffron"],
    baseNotes: ["Amber", "Sandalwood", "Vetiver"],
    concentration: "Extrait de Parfum",
    volume: "50ml / 100ml",
    longevity: "12–16 hours",
    origin: "Arabian Peninsula",
    accentRgb: "42,42,42",
  },
  {
    id: 2,
    name: "LUMIÈRE BLANCHE",
    tagline: "Light distilled into silk",
    price: "$280",
    notes: ["White Iris", "Neroli", "Musk"],
    accent: "#5a4a8a",
    accentLight: "#9a8aba",
    highlight: "#b06fff",
    image: "images/3-2-perfume-free-download-png-thumb.png",
    description: "Pure light captured in crystal. White iris and neroli bloom in an eternal Provençal morning.",
    longDescription: "LUMIÈRE BLANCHE was born from a single memory — a Provençal morning where light poured through white linen curtains and the world smelled of iris fields and orange blossom. The opening is blindingly luminous: cold neroli and white iris petals, dewy and alive. The heart settles into warm musks and soft cashmere wood, like sunlight warming white marble. This is the scent of elegance without effort.",
    topNotes: ["Neroli", "White Iris", "Aldehydes"],
    heartNotes: ["Jasmine Absolute", "White Peony", "Orris Root"],
    baseNotes: ["Musk", "Cashmere Wood", "White Amber"],
    concentration: "Eau de Parfum",
    volume: "50ml / 100ml",
    longevity: "8–12 hours",
    origin: "Grasse, France",
    accentRgb: "90,74,138",
  },
  {
    id: 3,
    name: "ROUGE ÉTERNEL",
    tagline: "Passion without boundaries",
    price: "$350",
    notes: ["Saffron", "Velvet Rose", "Sandalwood"],
    accent: "#8a1a2a",
    accentLight: "#c05a6a",
    highlight: "#e8003d",
    image: "images/Luxury-Perfume-PNG-Free-Download.png",
    description: "A crimson tempest of saffron and velvet rose. Bold, unapologetic, unforgettable.",
    longDescription: "ROUGE ÉTERNEL is the fragrance equivalent of a crimson silk dress — audacious, sensual, impossible to ignore. It opens with a dazzling saffron accord, golden and spiced, before the heart erupts into a velvet rose of extraordinary depth. Bulgarian rose absolute and Turkish rose otto entwine with oud wood in an embrace that refuses to let go. The base of warm sandalwood and smoky labdanum lingers as a passionate whisper long after you have left the room.",
    topNotes: ["Saffron", "Pink Pepper", "Cardamom"],
    heartNotes: ["Velvet Rose", "Bulgarian Rose Absolute", "Oud Wood"],
    baseNotes: ["Sandalwood", "Labdanum", "Dark Musk"],
    concentration: "Parfum",
    volume: "50ml / 100ml",
    longevity: "14–18 hours",
    origin: "Istanbul & Grasse",
    accentRgb: "138,26,42",
  },
];

const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

function BottleImg({ perfume, spinning, onClick, width = "220px", height = "380px", extraStyle = {} }) {
  return (
    <div onClick={onClick} style={{
      cursor: onClick ? "pointer" : "default",
      width, height,
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: spinning ? "spin3d 1.2s ease-in-out" : "floatBottle 4s ease-in-out infinite",
      flexShrink: 0,
      ...extraStyle,
    }}>
      <img src={perfume.image} alt={perfume.name} style={{
        width: "100%", height: "100%", objectFit: "contain",
        filter: `drop-shadow(0px 24px 48px rgba(${perfume.accentRgb}, 0.22))`,
        transition: "filter 0.8s ease",
      }} />
    </div>
  );
}

// ── DETAIL PAGE ───────────────────────────────────────────────────────────────
function DetailPage({ perfume, onBack }) {
  const [visible, setVisible] = useState(false);
  const [qty, setQty] = useState(1);
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setVisible(true), 40);
    return () => clearTimeout(t);
  }, []);

  const handleBack = () => {
    setVisible(false);
    setTimeout(onBack, 480);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#f9f7f4",
      zIndex: 1000, overflowY: "auto",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.48s cubic-bezier(0.4,0,0.2,1)",
    }}>
      {/* Sticky nav */}
      <div style={{
        position: "sticky", top: 0, zIndex: 20,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: isMobile ? "16px 20px" : "20px 60px",
        background: "rgba(249,247,244,0.94)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
      }}>
        <button onClick={handleBack} style={{
          display: "flex", alignItems: "center", gap: "8px",
          background: "none", border: "none", cursor: "pointer",
          fontFamily: "'Jost', sans-serif", fontSize: "0.72rem",
          letterSpacing: "0.2em", color: "#999", transition: "color 0.3s",
        }}
          onMouseEnter={e => e.currentTarget.style.color = perfume.accent}
          onMouseLeave={e => e.currentTarget.style.color = "#999"}
        >← BACK</button>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "1.1rem" : "1.3rem", letterSpacing: "0.35em", color: "#1a1a1a", fontWeight: 300 }}>OBSCURA</span>
        <div style={{ width: isMobile ? "52px" : "80px" }} />
      </div>

      {/* Hero block */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: isMobile ? "0" : "80px",
        padding: isMobile ? "40px 20px 40px" : "80px 60px 60px",
        flexDirection: isMobile ? "column" : "row",
        flexWrap: "wrap",
        maxWidth: "1200px", margin: "0 auto",
      }}>
        {/* Bottle */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0) scale(1)" : "translateX(-80px) scale(0.88)",
          transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.12s",
        }}>
          <BottleImg perfume={perfume} spinning={false} onClick={null}
            width={isMobile ? "180px" : "300px"}
            height={isMobile ? "280px" : "460px"} />
        </div>

        {/* Text */}
        <div style={{
          maxWidth: isMobile ? "100%" : "500px",
          flex: 1,
          width: isMobile ? "100%" : "auto",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(80px)",
          transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.22s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.22s",
          textAlign: isMobile ? "center" : "left",
        }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.62rem", letterSpacing: "0.3em", color: perfume.accentLight, marginBottom: "14px" }}>
            {perfume.concentration.toUpperCase()}
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: isMobile ? "2.8rem" : "clamp(2.8rem, 5vw, 5rem)",
            fontWeight: 300, lineHeight: 0.9,
            color: "#1a1a1a", margin: "0 0 20px", letterSpacing: "-0.02em",
          }}>
            {perfume.name.split(" ").map((w, i) => <span key={i} style={{ display: "block" }}>{w}</span>)}
          </h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#aaa", fontStyle: "italic", marginBottom: "28px" }}>
            {perfume.tagline}
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px", justifyContent: isMobile ? "center" : "flex-start" }}>
            {perfume.notes.map(n => (
              <span key={n} style={{
                border: `1px solid ${perfume.accent}`, color: perfume.accent,
                padding: "5px 14px", fontFamily: "'Jost', sans-serif",
                fontSize: "0.62rem", letterSpacing: "0.15em", borderRadius: "20px",
              }}>{n.toUpperCase()}</span>
            ))}
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: "#666", lineHeight: 1.9, marginBottom: "40px", textAlign: "left" }}>
            {perfume.longDescription}
          </p>
          {/* Price + qty */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px", flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", color: "#1a1a1a", fontWeight: 300 }}>{perfume.price}</span>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #ddd", borderRadius: "2px" }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: "42px", height: "46px", background: "none", border: "none", cursor: "pointer", fontSize: "1.3rem", color: "#aaa" }}>−</button>
              <span style={{ width: "42px", textAlign: "center", fontFamily: "'Jost', sans-serif", color: "#1a1a1a" }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{ width: "42px", height: "46px", background: "none", border: "none", cursor: "pointer", fontSize: "1.3rem", color: "#aaa" }}>+</button>
            </div>
          </div>
          <button style={{
            background: perfume.accent, color: "#fff", border: "none",
            padding: "16px 0", width: "100%",
            fontFamily: "'Jost', sans-serif", fontSize: "0.72rem",
            letterSpacing: "0.22em", cursor: "pointer", borderRadius: "2px",
            transition: "transform 0.22s, box-shadow 0.22s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 14px 40px rgba(${perfume.accentRgb},0.3)`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >ADD TO COLLECTION</button>
        </div>
      </div>

      <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", margin: isMobile ? "0 20px" : "0 60px" }} />

      {/* Scent Pyramid */}
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: isMobile ? "50px 20px" : "80px 60px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s",
      }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.62rem", letterSpacing: "0.35em", color: "#bbb", marginBottom: "12px" }}>THE COMPOSITION</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "1.8rem" : "clamp(2rem, 3.5vw, 3rem)", fontWeight: 300, color: "#1a1a1a", margin: "0 0 48px" }}>Scent Pyramid</h2>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "2px" }}>
          {[
            { label: "Top Notes", notes: perfume.topNotes, desc: "First impression · 0–30 min", dark: true },
            { label: "Heart Notes", notes: perfume.heartNotes, desc: "The soul · 30 min–4 hrs", dark: false },
            { label: "Base Notes", notes: perfume.baseNotes, desc: "The memory · 4–18 hrs", dark: false, soft: true },
          ].map((tier) => (
            <div key={tier.label} style={{
              background: tier.dark ? perfume.accent : tier.soft ? "#f4f2ef" : "#fff",
              padding: isMobile ? "32px 24px" : "48px 40px",
              borderTop: !tier.dark ? `3px solid ${perfume.accent}` : "none",
            }}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", letterSpacing: "0.22em", color: tier.dark ? "rgba(255,255,255,0.5)" : perfume.accentLight, marginBottom: "8px" }}>
                {tier.desc.toUpperCase()}
              </p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 400, color: tier.dark ? "#fff" : "#1a1a1a", margin: "0 0 24px" }}>{tier.label}</h3>
              {tier.notes.map(n => (
                <div key={n} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: tier.dark ? "rgba(255,255,255,0.45)" : perfume.accent, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: tier.dark ? "rgba(255,255,255,0.88)" : "#555" }}>{n}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Details strip */}
      <div style={{
        background: "#1a1a1a", padding: isMobile ? "40px 20px" : "60px",
        opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.5s",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: isMobile ? "28px 20px" : "40px" }}>
          {[
            ["Concentration", perfume.concentration],
            ["Volume", perfume.volume],
            ["Longevity", perfume.longevity],
            ["Origin", perfume.origin],
          ].map(([label, val]) => (
            <div key={label}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.58rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.3)", marginBottom: "10px" }}>{label.toUpperCase()}</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "1rem" : "1.15rem", color: "#fff", fontWeight: 300 }}>{val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* You may also love */}
      <div style={{ padding: isMobile ? "60px 20px" : "100px 60px", maxWidth: "1200px", margin: "0 auto" }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.62rem", letterSpacing: "0.35em", color: "#bbb", marginBottom: "12px" }}>EXPLORE MORE</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "1.8rem" : "clamp(2rem, 3.5vw, 3rem)", fontWeight: 300, color: "#1a1a1a", margin: "0 0 48px" }}>You may also love</h2>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "2px" }}>
          {PERFUMES.filter(p => p.id !== perfume.id).map(p => (
            <div key={p.id} style={{
              background: "#f4f2ef", padding: isMobile ? "28px 20px" : "44px 40px",
              display: "flex", gap: isMobile ? "20px" : "30px", alignItems: "center",
              cursor: "pointer", transition: "background 0.3s",
              border: "1px solid transparent",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#edeae6"; e.currentTarget.style.borderColor = `rgba(${p.accentRgb},0.15)`; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#f4f2ef"; e.currentTarget.style.borderColor = "transparent"; }}
            >
              <img src={p.image} alt={p.name} style={{ width: isMobile ? "60px" : "80px", height: isMobile ? "90px" : "120px", objectFit: "contain", filter: `drop-shadow(0 10px 20px rgba(${p.accentRgb},0.18))`, flexShrink: 0 }} />
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "1.1rem" : "1.3rem", color: "#1a1a1a", fontWeight: 400, margin: "0 0 6px" }}>{p.name}</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: "#aaa", fontStyle: "italic", margin: "0 0 12px" }}>{p.tagline}</p>
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "1rem", color: p.accent }}>{p.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: "#1a1a1a", padding: isMobile ? "24px 20px" : "40px 60px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "#fff", letterSpacing: "0.35em", fontWeight: 300 }}>OBSCURA</span>
        <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.58rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)" }}>© 2025 OBSCURA PARFUMS</span>
      </div>
    </div>
  );
}

// ── HERO SECTION ──────────────────────────────────────────────────────────────
function HeroSection({ currentPerfume, onBottleClick, spinning, onSelectPerfume }) {
  const p = PERFUMES[currentPerfume];
  const isMobile = useIsMobile();

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", background: "#f9f7f4",
    }}>
      {/* Subtle glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 55% 55% at 58% 50%, rgba(${p.accentRgb},0.06) 0%, transparent 70%)`,
        transition: "background 1s ease",
      }} />

      {/* Decorative lines */}
      {[12, 30, 70, 88].map(pct => (
        <div key={pct} style={{ position: "absolute", left: 0, right: 0, top: `${pct}%`, height: "1px", background: "rgba(0,0,0,0.04)", pointerEvents: "none" }} />
      ))}

      {/* Navbar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: isMobile ? "18px 20px" : "26px 60px", zIndex: 10,
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "1.15rem" : "1.4rem", color: "#1a1a1a", letterSpacing: "0.35em", fontWeight: 300 }}>OBSCURA</span>
        {!isMobile && (
          <nav style={{ display: "flex", gap: "2.5rem" }}>
            {["Collections", "About", "Stores"].map(item => (
              <span key={item} style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.68rem", color: "#aaa", letterSpacing: "0.2em", cursor: "pointer", transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = "#1a1a1a"}
                onMouseLeave={e => e.target.style.color = "#aaa"}
              >{item.toUpperCase()}</span>
            ))}
          </nav>
        )}
        <button style={{ background: "#1a1a1a", color: "#fff", border: "none", padding: isMobile ? "8px 16px" : "10px 24px", fontFamily: "'Jost', sans-serif", fontSize: isMobile ? "0.58rem" : "0.65rem", letterSpacing: "0.2em", cursor: "pointer", borderRadius: "1px" }}>
          SHOP NOW
        </button>
      </div>

      {/* Layout — vertical on mobile, horizontal on desktop */}
      {isMobile ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 5, padding: "100px 20px 40px", width: "100%", textAlign: "center" }}>
          {/* Badge */}
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.58rem", letterSpacing: "0.32em", color: p.accentLight, marginBottom: "14px" }}>
            EXCLUSIVE — {currentPerfume + 1}/{PERFUMES.length}
          </p>
          {/* Title */}
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3.2rem", fontWeight: 300, lineHeight: 0.88, color: "#1a1a1a", margin: "0 0 16px", letterSpacing: "-0.03em" }}>
            {p.name.split(" ").map((word, i) => <span key={i} style={{ display: "block" }}>{word}</span>)}
          </h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#aaa", fontStyle: "italic", marginBottom: "18px" }}>{p.tagline}</p>

          {/* Bottle */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "8px 0 16px" }}>
            <BottleImg perfume={p} spinning={spinning} onClick={onBottleClick} width="200px" height="300px" />
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#ccc", marginTop: "10px" }}>TAP TO CYCLE</p>
          </div>

          {/* Notes */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px", justifyContent: "center" }}>
            {p.notes.map(note => (
              <span key={note} style={{ border: `1px solid ${p.accent}`, color: p.accent, padding: "4px 12px", fontFamily: "'Jost', sans-serif", fontSize: "0.58rem", letterSpacing: "0.15em", borderRadius: "20px" }}>
                {note.toUpperCase()}
              </span>
            ))}
          </div>

          {/* Description */}
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "#999", lineHeight: 1.9, marginBottom: "28px", maxWidth: "340px" }}>{p.description}</p>

          {/* Dots */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "28px" }}>
            {PERFUMES.map((_, i) => (
              <div key={i} style={{ width: i === currentPerfume ? "32px" : "8px", height: "8px", borderRadius: "4px", background: i === currentPerfume ? p.accent : "#ddd", transition: "all 0.4s ease", cursor: "pointer" }} onClick={onBottleClick} />
            ))}
          </div>

          {/* Price + CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.6rem", color: "#1a1a1a", fontWeight: 300 }}>{p.price}</span>
            <button style={{
              background: p.accent, color: "#fff", border: "none",
              padding: "14px 28px", fontFamily: "'Jost', sans-serif",
              fontSize: "0.62rem", letterSpacing: "0.2em", cursor: "pointer", borderRadius: "2px",
            }}>ADD TO COLLECTION</button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "60px", zIndex: 5, padding: "0 60px", maxWidth: "1300px", width: "100%", marginTop: "60px" }}>
          {/* Left */}
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.62rem", letterSpacing: "0.35em", color: p.accentLight, marginBottom: "20px" }}>
              EXCLUSIVE COLLECTION — {currentPerfume + 1}/{PERFUMES.length}
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.5rem, 7vw, 7rem)", fontWeight: 300, lineHeight: 0.88, color: "#1a1a1a", margin: "0 0 24px", letterSpacing: "-0.03em" }}>
              {p.name.split(" ").map((word, i) => <span key={i} style={{ display: "block" }}>{word}</span>)}
            </h1>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#aaa", fontStyle: "italic", marginBottom: "24px" }}>{p.tagline}</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "40px" }}>
              {p.notes.map(note => (
                <span key={note} style={{ border: `1px solid ${p.accent}`, color: p.accent, padding: "5px 14px", fontFamily: "'Jost', sans-serif", fontSize: "0.62rem", letterSpacing: "0.15em", borderRadius: "20px" }}>
                  {note.toUpperCase()}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", color: "#1a1a1a", fontWeight: 300 }}>{p.price}</span>
              <button style={{
                background: p.accent, color: "#fff", border: "none",
                padding: "14px 32px", fontFamily: "'Jost', sans-serif",
                fontSize: "0.68rem", letterSpacing: "0.2em", cursor: "pointer", borderRadius: "2px",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 30px rgba(${p.accentRgb},0.28)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >ADD TO COLLECTION</button>
            </div>
          </div>

          {/* Center bottle */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <BottleImg perfume={p} spinning={spinning} onClick={onBottleClick} width="320px" height="480px" />
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.58rem", letterSpacing: "0.2em", color: "#ccc", marginTop: "14px" }}>CLICK TO CYCLE</p>
          </div>

          {/* Right */}
          <div style={{ flex: 1, textAlign: "right" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#999", lineHeight: 1.9, marginBottom: "40px" }}>{p.description}</p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginBottom: "32px" }}>
              {PERFUMES.map((_, i) => (
                <div key={i} style={{ width: i === currentPerfume ? "32px" : "8px", height: "8px", borderRadius: "4px", background: i === currentPerfume ? p.accent : "#ddd", transition: "all 0.4s ease", cursor: "pointer" }} onClick={onBottleClick} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "36px", height: "1px", background: "#ddd" }} />
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.58rem", letterSpacing: "0.28em", color: "#ccc" }}>{p.concentration.toUpperCase()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Big watermark */}
      <div style={{
        position: "absolute", bottom: -70, left: "50%", transform: "translateX(-50%)",
        fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(6rem, 18vw, 16rem)",
        fontWeight: 700, color: "#1a1a1a", opacity: 0.03,
        whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none", letterSpacing: "-0.04em",
      }}>OBSCURA</div>
    </section>
  );
}

// ── MARQUEE ───────────────────────────────────────────────────────────────────
function MarqueeSection() {
  const words = ["OUD", "IRIS", "NEROLI", "SAFFRON", "ROSE", "AMBER", "MUSK", "VETIVER", "BERGAMOT", "PATCHOULI"];
  return (
    <div style={{ background: "#000", padding: "15px 0", overflow: "hidden", display: "flex" }}>
      <div style={{ display: "flex", animation: "marquee 22s linear infinite", whiteSpace: "nowrap" }}>
        {[...words, ...words, ...words].map((w, i) => (
          <span key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.35em", color: "#fff", padding: "0 2rem" }}>{w} ✦</span>
        ))}
      </div>
    </div>
  );
}

// ── COLLECTION ────────────────────────────────────────────────────────────────
function CollectionSection({ onSelectPerfume }) {
  const isMobile = useIsMobile();
  return (
    <section style={{ background: "#111", padding: isMobile ? "70px 20px" : "120px 60px" }}>
      <div className="reveal" style={{ textAlign: "center", marginBottom: isMobile ? "48px" : "80px" }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.62rem", letterSpacing: "0.35em", color: "#666", marginBottom: "16px" }}>THE COLLECTION</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "2.2rem" : "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, color: "#f0ece4", margin: 0, letterSpacing: "-0.02em" }}>
          Scents that tell stories
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? "16px" : "20px", maxWidth: "1200px", margin: "0 auto" }}>
        {PERFUMES.map((p, i) => (
          <div
            key={p.id}
            className="reveal"
            onClick={() => onSelectPerfume(p)}
            style={{
              background: `rgba(${p.accentRgb}, 0.12)`,
              padding: isMobile ? "36px 24px 28px" : "50px 32px 36px",
              textAlign: "center",
              cursor: "pointer",
              border: `1px solid rgba(${p.accentRgb}, 0.25)`,
              borderRadius: "4px",
              transition: "transform 0.4s ease, box-shadow 0.4s ease, border-color 0.3s, background 0.3s",
              animationDelay: `${i * 0.12}s`,
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.background = `rgba(${p.accentRgb}, 0.2)`;
              e.currentTarget.style.boxShadow = `0 28px 64px rgba(${p.accentRgb}, 0.25)`;
              e.currentTarget.style.borderColor = p.accent;
              e.currentTarget.querySelector("img").style.transform = "scale(1.05)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = `rgba(${p.accentRgb}, 0.12)`;
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = `rgba(${p.accentRgb}, 0.25)`;
              e.currentTarget.querySelector("img").style.transform = "scale(1)";
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: p.accent }} />
            <div style={{ height: isMobile ? "180px" : "280px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: isMobile ? "120px" : "240px",
                  height: isMobile ? "200px" : "360px",
                  objectFit: "contain",
                  filter: `drop-shadow(0 16px 32px rgba(255, 240, 210, 0.18)) drop-shadow(0 4px 12px rgba(255, 220, 160, 0.12))`,
                  transition: "transform 0.4s ease",
                }}
              />
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "1.2rem" : "1.35rem", color: "#f0ece4", margin: "0 0 6px", fontWeight: 400, letterSpacing: "0.03em" }}>{p.name}</h3>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.88rem", color: "#888", fontStyle: "italic", marginBottom: "16px" }}>{p.tagline}</p>
            <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap", marginBottom: "20px" }}>
              {p.notes.slice(0, 2).map(n => (
                <span key={n} style={{ fontSize: "0.58rem", fontFamily: "'Jost', sans-serif", letterSpacing: "0.12em", color: p.accentLight, background: `rgba(${p.accentRgb}, 0.15)`, padding: "3px 10px", borderRadius: "20px" }}>{n}</span>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "#f0ece4", fontWeight: 300 }}>{p.price}</span>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.58rem", letterSpacing: "0.2em", color: p.accent, borderBottom: `1px solid ${p.accent}`, paddingBottom: "2px" }}>EXPLORE →</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── STORY SECTION ─────────────────────────────────────────────────────────────
function StorySection() {
  const isMobile = useIsMobile();
  return (
    <section style={{ background: "#f4f2ef", padding: isMobile ? "80px 20px" : "140px 60px", display: "flex", alignItems: "center", justifyContent: "center", gap: isMobile ? "48px" : "120px", flexWrap: "wrap", flexDirection: isMobile ? "column" : "row" }}>
      {/* Left text block */}
      <div className="reveal" style={{ maxWidth: isMobile ? "100%" : "480px", width: "100%" }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.62rem", letterSpacing: "0.35em", color: "#bbb", marginBottom: "20px" }}>OUR PHILOSOPHY</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "2rem" : "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, color: "#1a1a1a", margin: "0 0 24px", lineHeight: 1.1 }}>
          Scent is the most intimate form of memory
        </h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: "#888", lineHeight: 1.9, marginBottom: "48px" }}>
          At Obscura, we craft each fragrance as an act of poetry. Our perfumers travel the world — from Grasse to Kyoto, from Zanzibar to Peru — sourcing only the rarest ingredients for compositions that transcend ordinary experience.
        </p>
        <div style={{ display: "flex", gap: isMobile ? "2rem" : "4rem" }}>
          {[["42", "Ingredients"], ["12", "Countries"], ["1938", "Founded"]].map(([num, label]) => (
            <div key={label} style={{ cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.querySelector(".stat-num").style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.querySelector(".stat-num").style.transform = "translateY(0)"; }}
            >
              <div className="stat-num" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "2.2rem" : "2.8rem", color: "#1a1a1a", fontWeight: 300, transition: "transform 0.3s ease" }}>{num}</div>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#bbb" }}>{label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right image block */}
      <div className="reveal" style={{ position: "relative", flexShrink: 0 }}
        onMouseEnter={e => {
          e.currentTarget.querySelector(".front-card").style.transform = "translateY(-8px)";
          e.currentTarget.querySelector(".front-card").style.boxShadow = "0 40px 80px rgba(0,0,0,0.35), 0 12px 32px rgba(0,0,0,0.2)";
          const bs = e.currentTarget.querySelector(".back-shadow");
          if (bs) { bs.style.boxShadow = "12px 12px 48px rgba(0,0,0,0.22)"; bs.style.transform = "translate(-20px, -20px)"; }
        }}
        onMouseLeave={e => {
          e.currentTarget.querySelector(".front-card").style.transform = "translateY(0)";
          e.currentTarget.querySelector(".front-card").style.boxShadow = "0 24px 60px rgba(0,0,0,0.22), 0 6px 20px rgba(0,0,0,0.12)";
          const bs = e.currentTarget.querySelector(".back-shadow");
          if (bs) { bs.style.boxShadow = "8px 8px 32px rgba(0,0,0,0.14)"; bs.style.transform = "translate(0,0)"; }
        }}
      >
        <div className="front-card" style={{
          width: isMobile ? "100%" : "360px",
          maxWidth: isMobile ? "340px" : "360px",
          height: isMobile ? "380px" : "480px",
          background: "#1a1a1a",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "4px",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.22), 0 6px 20px rgba(0,0,0,0.12)",
          transition: "transform 0.5s ease, box-shadow 0.5s ease",
        }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse 70% 60% at 50% 40%, rgba(${PERFUMES[1].accentRgb},0.10) 0%, transparent 70%)` }} />
          <div style={{ animation: "floatBottle 5s ease-in-out infinite", zIndex: 2 }}>
            <img src={PERFUMES[1].image} alt="Story" style={{ width: isMobile ? "140px" : "200px", height: isMobile ? "240px" : "340px", objectFit: "contain", filter: `drop-shadow(0 24px 48px rgba(255,220,160,0.18)) drop-shadow(0 6px 16px rgba(255,200,120,0.12))` }} />
          </div>
          <div style={{
            position: "absolute", bottom: "20px", left: "20px", right: "20px",
            background: "rgba(30,28,26,0.92)", backdropFilter: "blur(10px)",
            padding: "16px 20px", borderRadius: "2px",
            border: "1px solid rgba(255,255,255,0.08)", zIndex: 3,
          }}>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.56rem", letterSpacing: "0.2em", color: "#666", marginBottom: "4px" }}>MASTER PERFUMER</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#f0ece4" }}>Antoine Delacroix</div>
          </div>
        </div>
        {!isMobile && (
          <div className="back-shadow" style={{
            position: "absolute", top: "-16px", right: "-16px",
            width: "100%", height: "100%",
            border: "1px solid rgba(0,0,0,0.10)", borderRadius: "4px", zIndex: -1,
            boxShadow: "8px 8px 32px rgba(0,0,0,0.14)",
            transition: "transform 0.5s ease, box-shadow 0.5s ease",
          }} />
        )}
      </div>
    </section>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const isMobile = useIsMobile();
  const reviews = [
    { quote: "Wearing Noir Absolu is like wearing a secret. Rich, intoxicating, unforgettable.", author: "Sofia M., Milan" },
    { quote: "Lumière Blanche is the most elegant thing I have ever experienced. Pure crystalline light.", author: "James R., London" },
    { quote: "Rouge Éternel stopped three strangers in a single afternoon. Witchcraft in a bottle.", author: "Camille D., Paris" },
  ];
  return (
    <section style={{ background: "#fff", padding: isMobile ? "70px 20px" : "120px 60px" }}>
      <div className="reveal" style={{ textAlign: "center", marginBottom: isMobile ? "44px" : "70px" }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.62rem", letterSpacing: "0.35em", color: "#bbb", marginBottom: "16px" }}>WHAT THEY SAY</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "2rem" : "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, color: "#1a1a1a", margin: 0 }}>Stories written in scent</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "16px", maxWidth: "1100px", margin: "0 auto" }}>
        {reviews.map((r, i) => (
          <div key={i} className="reveal" style={{ background: "#f9f7f4", padding: isMobile ? "32px 24px" : "44px 36px", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "4px", animationDelay: `${i * 0.1}s` }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", color: "#e0dbd5", lineHeight: 1, marginBottom: "16px" }}>"</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: "#666", lineHeight: 1.85, fontStyle: "italic", marginBottom: "24px" }}>{r.quote}</p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#bbb" }}>— {r.author.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer style={{ background: "#1a1a1a", padding: isMobile ? "60px 20px 32px" : "80px 60px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: isMobile ? "32px" : "40px", marginBottom: isMobile ? "40px" : "60px", flexDirection: isMobile ? "column" : "row" }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#fff", letterSpacing: "0.35em", fontWeight: 300, marginBottom: "16px" }}>OBSCURA</div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.3)", maxWidth: "260px", lineHeight: 1.85, fontStyle: "italic" }}>
            Extraordinary fragrances for those who dare to be unforgettable.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(3, auto)", gap: isMobile ? "24px 12px" : "0 60px" }}>
          {[
            { title: "Collections", links: ["Noir Absolu", "Lumière Blanche", "Rouge Éternel"] },
            { title: "Maison", links: ["Our Story", "Perfumers", "Sustainability"] },
            { title: "Client", links: ["Contact", "Stores", "Bespoke Service"] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.35)", marginBottom: "16px" }}>{col.title.toUpperCase()}</div>
              {col.links.map(link => (
                <div key={link} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.28)", marginBottom: "10px", cursor: "pointer", transition: "color 0.3s" }}
                  onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.8)"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.28)"}
                >{link}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "24px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", flexDirection: isMobile ? "column" : "row" }}>
        <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.56rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.16)" }}>© 2025 OBSCURA PARFUMS. ALL RIGHTS RESERVED.</span>
        <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.56rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.16)" }}>PARIS · DUBAI · TOKYO · NEW YORK</span>
      </div>
    </footer>
  );
}

// ── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #f9f7f4; overflow-x: hidden; }

  @keyframes floatBottle {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-16px); }
  }
  @keyframes spin3d {
    0% { transform: rotateY(0deg); }
    50% { transform: rotateY(180deg) scale(1.06); }
    100% { transform: rotateY(360deg); }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-33.33%); }
  }

  .reveal {
    opacity: 0;
    transform: translateY(36px);
    transition: opacity 0.9s ease, transform 0.9s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #f9f7f4; }
  ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 2px; }

  @media (max-width: 767px) {
    section { overflow-x: hidden; }
  }
`;

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [currentPerfume, setCurrentPerfume] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [selectedPerfume, setSelectedPerfume] = useState(null);

  useScrollAnimation();

  const handleBottleClick = () => {
    if (spinning) return;
    setSpinning(true);
    setTimeout(() => {
      setCurrentPerfume(prev => (prev + 1) % PERFUMES.length);
      setSpinning(false);
    }, 600);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!spinning && !selectedPerfume) handleBottleClick();
    }, 5000);
    return () => clearInterval(timer);
  }, [spinning, currentPerfume, selectedPerfume]);

  if (selectedPerfume) {
    return (
      <>
        <style>{globalStyles}</style>
        <DetailPage perfume={selectedPerfume} onBack={() => setSelectedPerfume(null)} />
      </>
    );
  }

  return (
    <>
      <style>{globalStyles}</style>
      <HeroSection currentPerfume={currentPerfume} onBottleClick={handleBottleClick} spinning={spinning} />
      <MarqueeSection />
      <CollectionSection onSelectPerfume={setSelectedPerfume} />
      <StorySection />
      <TestimonialsSection />
      <Footer />
    </>
  );
}