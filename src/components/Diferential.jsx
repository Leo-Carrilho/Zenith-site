// components/Diferenciais.jsx
import { useEffect, useRef } from "react";
import { FaShieldAlt, FaUsers, FaClock, FaAward } from "react-icons/fa";

export default function Diferenciais() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      sectionRef.current.querySelectorAll(".feature-item"),
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, stagger: 0.12, duration: 0.6, ease: "back.out(1.5)", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
    );
  }, []);

  const features = [
    { icon: <FaShieldAlt />, title: "Tecnologia de Ponta", desc: "Os melhores equipamentos e softwares do mercado." },
    { icon: <FaUsers />, title: "Suporte Especializado", desc: "Agrônomos e engenheiros prontos para ajudar." },
    { icon: <FaClock />, title: "Resposta Rápida", desc: "Atendimento em até 24h para urgências." },
    { icon: <FaAward />, title: "Certificação ISO", desc: "Processos certificados garantindo qualidade." },
  ];

  return (
    <section className="features-section" ref={sectionRef}>
       <div className="bg-image"></div>
      <div className="bg-overlay"></div>
      
      <div className="container">
        <div className="section-header">
          <span className="tag">Por que escolher a Zenith</span>
          <h2>Nossos <span>diferenciais</span></h2>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-item" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}