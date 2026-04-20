// components/Depoimentos.jsx
import { useEffect, useRef } from "react";

export default function Depoimentos() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      sectionRef.current.querySelectorAll(".testimonial-card"),
      { opacity: 0, y: 50, rotateY: 10 },
      { opacity: 1, y: 0, rotateY: 0, stagger: 0.18, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
    );
  }, []);

  const testimonials = [
    { text: "Com a Zenith aumentamos a produtividade em 40% e reduzimos perdas. O monitoramento por drones revolucionou nossa gestão.", author: "João Silva", location: "Fazenda Santa Maria, SP" },
    { text: "A análise de dados nos ajudou a economizar 30% em insumos. A precisão é impressionante e o suporte está sempre disponível.", author: "Maria Oliveira", location: "Agropecuária Boa Vista, MG" },
    { text: "Melhor investimento que fizemos. A plataforma é intuitiva e os relatórios gerados pela IA são extremamente valiosos.", author: "Carlos Mendes", location: "Sítio São Pedro, MG" },
  ];

  return (
    <section className="testimonials-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="tag">O que dizem nossos clientes</span>
          <h2>Histórias de <span>sucesso</span></h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-quote">"</div>
              <p>{t.text}</p>
              <div className="testimonial-author">
                <strong>{t.author}</strong>
                <span>{t.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}