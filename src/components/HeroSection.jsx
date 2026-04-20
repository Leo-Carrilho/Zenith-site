// components/HeroSection.jsx
import { useEffect, useRef } from "react";
import { FaPlane, FaSeedling, FaMicrochip, FaSun, FaNetworkWired, FaWhatsapp, FaDna, FaChartBar, FaDownload } from "react-icons/fa";

export default function HeroSection({ onInstallClick }) {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    // Parallax no fundo
    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Entrada do texto
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(
      textRef.current.querySelectorAll(".hero-tag, h1, p, .hero-buttons"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.18, duration: 0.9, ease: "power3.out" }
    );

    // Entrada da imagem
    tl.fromTo(
      imgRef.current,
      { opacity: 0, scale: 0.85, x: 60 },
      { opacity: 1, scale: 1, x: 0, duration: 1, ease: "power3.out" },
      "-=0.5"
    );

    // Stats
    tl.fromTo(
      statsRef.current?.querySelectorAll(".stat-item") ?? [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: "back.out(1.4)" },
      "-=0.4"
    );

    // Circuito pulsante
    gsap.to(".circuit-dot", {
      opacity: 0.2,
      stagger: { each: 0.3, repeat: -1, yoyo: true },
      duration: 1.2,
      ease: "sine.inOut",
    });

    // Linha de dados
    gsap.to(".data-line", {
      scaleX: 1,
      stagger: 0.5,
      duration: 2,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  const handleInstall = () => {
    if (onInstallClick) {
      onInstallClick();
    } else {
      // Fallback: redirecionar para URL de instalação
      const PWA_URL = "https://instalacao-mobile.vercel.app";
      const isAndroid = /Android/i.test(navigator.userAgent);
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      
      if (isAndroid) {
        window.location.href = `${PWA_URL}?install=true`;
        setTimeout(() => {
          alert('📱 Quando a tela de instalação aparecer, clique em "Instalar"');
        }, 1000);
      } else if (isIOS) {
        window.open(PWA_URL, '_blank');
      } else {
        window.location.href = PWA_URL;
      }
    }
  };

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-bg" ref={bgRef} />
      <div className="hero-grid-overlay" />

      {/* Elementos decorativos */}
      <div className="circuit-decorations">
        <span className="circuit-dot" style={{ top: "20%", left: "8%" }} />
        <span className="circuit-dot" style={{ top: "70%", left: "5%" }} />
        <span className="circuit-dot" style={{ top: "35%", right: "10%" }} />
        <span className="circuit-dot" style={{ top: "80%", right: "15%" }} />
        <div className="data-line" style={{ top: "25%", left: "0", width: "120px" }} />
        <div className="data-line" style={{ bottom: "30%", right: "0", width: "80px" }} />
        <div className="float-icon fi-1"><FaSeedling /></div>
        <div className="float-icon fi-2"><FaMicrochip /></div>
        <div className="float-icon fi-3"><FaSun /></div>
        <div className="float-icon fi-4"><FaNetworkWired /></div>
      </div>

      <div className="hero-inner">
        <div className="hero-text" ref={textRef}>
          <span className="tag hero-tag">
            <FaSeedling style={{ marginRight: 6 }} /> Agricultura Inteligente
          </span>
          <h1>Sua precisão <span>agrícola</span> no ponto mais <span>alto</span></h1>
          <p>
            Monitoramento e manejo de plantio, detecção de pragas, análise de solo e muito mais. Tudo com a precisão e eficiência que só a tecnologia pode oferecer.
          </p>
          <div className="hero-buttons">
            <button onClick={handleInstall} className="btn btn-glow btn-install-hero">
              <FaDownload /> Baixar App
            </button>
            <a href="https://wa.me/5519999999999" className="btn-outline btn-wpp">
              <FaWhatsapp /> WhatsApp
            </a>
          </div>

          <div className="hero-stats-inline" ref={statsRef}>
            <div className="stat-item">
              <span className="stat-number">+500</span>
              <span className="stat-label">Hectares</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Precisão</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">-35%</span>
              <span className="stat-label">Custos</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" ref={imgRef}>
          <div className="hud-frame">
            <div className="hud-corner tl" />
            <div className="hud-corner tr" />
            <div className="hud-corner bl" />
            <div className="hud-corner br" />
            <div className="hud-scan-line" />
            <div className="hud-center-icon">
              <img src="assets/images/drone.png" className="hud-drone-icon" alt="Drone" />
              <div className="hud-radar-ring r1" />
              <div className="hud-radar-ring r2" />
              <div className="hud-radar-ring r3" />
            </div>
            <div className="hud-data-label top-left">BATERIA: 82%</div>
            <div className="hud-data-label top-right">ALTURA: 120cm</div>
            <div className="hud-data-label bot-left">
              <FaDna size={12} /> ESTRESSE: BAIXO - PLANTAÇÃO: +32%
            </div>
          </div>
        </div>
      </div>

      <div className="hero-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#11241b" />
        </svg>
      </div>
    </section>
  );
}