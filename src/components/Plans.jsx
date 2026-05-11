// components/Planos.jsx
import { useEffect, useRef } from "react";

export default function Planos() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      sectionRef.current.querySelectorAll(".pricing-card"),
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, stagger: 0.18, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
    );
  }, []);

  const plans = [
    {
      badge: "Básico", name: "Agro Vision", price: "R$ 799", period: "/anual",
      features: ["Monitoramento de até 50 ha", "Relatórios mensais com IA", "Suporte por e-mail", "Acesso ao monitoramento e detecção da platação"],
      featured: false,
    },
    {
      badge: "Profissional", name: "Agro Imperial", price: "R$ 1200", period: "/anual",
      features: ["Monitoramento de até 200 ha", "Relatórios semanais com IA", "Suporte prioritário 24/7", "Acesso completo ao app", "Consultoria especializada"],
      featured: true,
    },
    {
      badge: "Empresarial", name: "Agro Enterprise", price: "Sob consulta", period: "",
      features: ["Monitoramento ilimitado", "Relatórios em tempo real", "API de integração", "Gestor de conta exclusivo", "Treinamento in loco"],
      featured: false,
    },
  ];

  return (
    <section className="pricing-section" id="planos" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="tag">Planos e preços</span>
          <h2>Escolha o plano <span>ideal para você</span></h2>
          <p>Planos flexíveis que se adaptam às suas necessidades</p>
        </div>
        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <div className={`pricing-card ${plan.featured ? "featured" : ""}`} key={i}>
              <div className="pricing-badge">{plan.badge}</div>
              <h3>{plan.name}</h3>
              <div className="pricing-price">
                <span className="price">{plan.price}</span>
                {plan.period && <span className="period">{plan.period}</span>}
              </div>
              <ul className="pricing-features">
                {plan.features.map((f, j) => <li key={j}>{f}</li>)}
              </ul>
              <a href="https://wa.me/5519999999999" className={`btn-pricing ${plan.featured ? "featured-btn" : ""}`}>
                {plan.name === "Enterprise" ? "Fale conosco" : "Assinar"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}