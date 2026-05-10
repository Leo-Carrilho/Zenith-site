// components/Contato.jsx
import { useEffect, useRef, useState } from "react";
import { FaRegAddressCard, FaMailBulk, FaPhoneAlt, FaWhatsapp, FaLeaf, FaArrowRight } from "react-icons/fa";

export default function Contato() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      [
        sectionRef.current.querySelector(".contato-info"),
        sectionRef.current.querySelector(".form-container"),
      ],
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
    );
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: form.nome,
        email: form.email,
        mensagem: form.mensagem,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erro ao enviar");
    }

    // sucesso
    setSent(true);

    // limpa o form (importante)
    setForm({ nome: "", email: "", mensagem: "" });

    const gsap = window.gsap;
    if (gsap) {
      gsap.fromTo(
        ".form-success",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }
      );
    }

  } catch (error) {
    console.error("Erro real:", error);
    alert("Erro ao enviar mensagem");
  }
};

  return (
    <section className="contato" id="contato" ref={sectionRef}>
      <div className="contato-container">
        <div className="contato-info">
          <div className="info-header">
            <span className="tag">Fale conosco</span>
            <h2>Entre em <span className="accent">contato</span></h2>
            <p className="info-description">Nossa equipe está pronta para transformar sua produção. Resposta em até 24 horas.</p>
          </div>
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon"><FaRegAddressCard /></div>
              <div className="info-details">
                <h4>Endereço</h4>
                <p>Americana — SP</p>
                <p className="info-small">Interior Paulista</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon"><FaMailBulk /></div>
              <div className="info-details">
                <h4>E-mail</h4>
                <p>contato@agrotech.com</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon"><FaPhoneAlt /></div>
              <div className="info-details">
                <h4>Telefone</h4>
                <p>(19) 99999-9999</p>
              </div>
            </div>
            <div className="info-card info-card-wpp">
              <div className="info-icon"><FaWhatsapp /></div>
              <div className="info-details">
                <h4>WhatsApp</h4>
                <a href="https://wa.me/5519999999999" className="wpp-link">Enviar mensagem →</a>
              </div>
            </div>
          </div>
        </div>

        <div className="form-container">
          {sent ? (
            <div className="form-success">
              <FaLeaf size={48} style={{ color: "var(--primary)", marginBottom: 16 }} />
              <h3>Mensagem enviada!</h3>
              <p>Em breve nossa equipe entrará em contato.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="form-wrapper">
              <h3>Solicite uma <span className="accent">demonstração</span></h3>
              <div className="form-group">
                <label>Nome completo</label>
                <input type="text" placeholder="Seu nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input type="email" placeholder="seu@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Mensagem</label>
                <textarea rows={4} placeholder="Conte sobre sua propriedade..." value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })} required />
              </div>
              <button type="submit" className="submit-btn btn-glow">Enviar mensagem <FaArrowRight /></button>
              <p className="form-privacy">Seus dados estão protegidos. <a href="#">Política de privacidade</a>.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}