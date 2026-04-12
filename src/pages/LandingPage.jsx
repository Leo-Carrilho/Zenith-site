import { useEffect, useState, useRef } from "react";
import { 
  FaEnvelope, FaUser, FaComment, FaCheckCircle, 
  FaTimesCircle, FaTiktok, FaInstagram, FaLinkedin, FaFacebook, 
  FaDownload, FaRegAddressCard, FaMailBulk, FaPhoneAlt,
  FaBars, FaTimes
} from 'react-icons/fa';
import "../styles/LandingPage.css";
import LottieAnimation from "../components/LottieAnimation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Header from "../components/Header";

import monitoramento from "../../public/assets/icons/monitoramento.json";
import analiseSafra from "../../public/assets/icons/analiseSafra.json";
import mapeamento from "../../public/assets/icons/mapeamento.json";
import auxilioIA from "../../public/assets/icons/auxilioIA.json";
import downloadApp from "../../public/assets/icons/baixarApp.json";
import cadastroUser from "../../public/assets/icons/criarConta.json";
import droneMonitor from "../../public/assets/icons/conectadoSafra.json";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroImgRef = useRef(null);
  const navMenuRef = useRef(null);
  const menuOverlayRef = useRef(null);

  const handleInstallClick = async () => {
    const PWA_URL = "https://instalacao-mobile.vercel.app" 
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
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Fecha menu ao clicar em link
  const handleNavLinkClick = () => {
    closeMobileMenu();
  };

  useEffect(() => {
    // Previne scroll do body quando menu mobile estiver aberto
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    // Animações GSAP
    gsap.set(headerRef.current, { y: -120, opacity: 0 });
    gsap.set(".hero-text > *", { x: -80, opacity: 0 });
    gsap.set(heroImgRef.current, { x: 120, opacity: 0, scale: 0.9 });
    gsap.set(".hero-buttons a, .hero-buttons button", { y: 80, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(headerRef.current, { y: 0, opacity: 1, duration: 0.8 })
      .to(".hero-text > *", { x: 0, opacity: 1, stagger: 0.25, duration: 0.7 })
      .to(heroImgRef.current, { x: 0, opacity: 1, scale: 1, duration: 1 }, "-=0.6")
      .to(".hero-buttons a, .hero-buttons button", { y: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: "expo.out" }, "-=0.4");

    gsap.to(heroImgRef.current, { y: -20, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });
  const [formStatus, setFormStatus] = useState({ submitted: false, loading: false, success: false, message: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    else if (formData.nome.length < 3) newErrors.nome = 'Nome deve ter pelo menos 3 caracteres';
    
    if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'E-mail inválido';
    
    if (!formData.mensagem.trim()) newErrors.mensagem = 'Mensagem é obrigatória';
    else if (formData.mensagem.length < 10) newErrors.mensagem = 'Mensagem deve ter pelo menos 10 caracteres';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormStatus(prev => ({ ...prev, loading: true }));
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error();
      setFormStatus({
        submitted: true,
        loading: false,
        success: true,
        message: "Mensagem enviada com sucesso!"
      });
      setFormData({ nome: "", email: "", mensagem: "" });
    } catch {
      setFormStatus({
        submitted: true,
        loading: false,
        success: false,
        message: "Erro ao enviar mensagem"
      });
    }
  };

  return (
    <>
      {/* Header com menu mobile funcional */}
      <Header />

      <main>
        <section className="hero" id="home">
          <div className="hero-text" ref={heroTextRef}>
            <span className="tag">Tecnologia agrícola</span>
            <h1>Serviços para <span>agricultura inteligente</span></h1>
            <p>Drones de alta precisão para monitoramento de safras contra pragas e doenças.</p>
            <div className="hero-buttons">
              <button onClick={handleInstallClick} className="btn btn-install">
                <FaDownload /> Baixar App
              </button>
            </div>
          </div>
          <div className="hero-img" ref={heroImgRef}>
            <img src="/assets/images/Mockup_cell2.png" alt="Mockup celular" />
          </div>
        </section>

        <section className="servicos" id="servicos">
          <h2 id="titulo-section">Serviços que oferecemos</h2>
          <div className="cards">
            <div className="card">
              <LottieAnimation animationData={auxilioIA} loop={true} className="lottie-icon" />
              <h3>Auxilio de IA</h3>
            </div>
            <div className="card">
              <LottieAnimation animationData={mapeamento} loop={true} className="lottie-icon" />
              <h3>Mapeamento</h3>
            </div>
            <div className="card">
              <LottieAnimation animationData={monitoramento} loop={true} className="lottie-icon" />
              <h3>Monitoramento</h3>
            </div>
            <div className="card">
              <LottieAnimation animationData={analiseSafra} loop={true} className="lottie-icon" />
              <h3>Análise de Safra</h3>
            </div>
          </div>
        </section>

        <section className="como-funciona" id="como-funciona">
          <div className="como-funciona-header">
            <span className="tag">Passo a passo</span>
            <h2>Como acessar <span>nossa plataforma</span></h2>
            <p>Em apenas 3 passos você começa a monitorar suas safras com tecnologia de ponta</p>
          </div>

          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">
                <LottieAnimation animationData={downloadApp} loop={true} className="step-lottie" />
              </div>
              <h3>Baixe o App</h3>
              <p>Aperte o botão "Baixar App" para instalar o aplicativo</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">
                <LottieAnimation animationData={cadastroUser} loop={true} className="step-lottie" />
              </div>
              <h3>Crie sua conta</h3>
              <p>Cadastre-se gratuitamente e tenha acesso a todas as funcionalidades</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">
                <LottieAnimation animationData={droneMonitor} loop={true} className="step-lottie" />
              </div>
              <h3>Monitore sua safra</h3>
              <p>Conecte-se aos drones e comece a monitorar em tempo real</p>
            </div>
          </div>

          <div className="app-badges">
            <a href="#" className="store-badge"><FaInstagram size={24} color="#16f29a" /></a>
            <a href="#" className="store-badge"><FaTiktok size={24} color="#16f29a" /></a>
          </div>
        </section>

        <section className="contato" id="contato">
          <div className="contato-container">
            <div className="contato-info">
              <div className="info-header">
                <span className="tag">Fale conosco</span>
                <h2>Vamos conversar?</h2>
                <p className="info-description">
                  Tire suas dúvidas, solicite um orçamento ou saiba mais sobre nossas soluções 
                  para agricultura de precisão.
                </p>
              </div>

              <div className="info-cards">
                <div className="info-card">
                  <div className="info-icon"><FaEnvelope /></div>
                  <div className="info-details">
                    <h4>E-mail</h4>
                    <p>contato@agrotech.com</p>
                    <p className="info-small">Respondemos em até 24h</p>
                  </div>
                </div>
                <div className="info-card">
                  <div className="info-icon"><FaComment /></div>
                  <div className="info-details">
                    <h4>WhatsApp</h4>
                    <p>(19) 99999-9999</p>
                    <p className="info-small">Atendimento das 8h às 18h</p>
                  </div>
                </div>
                <div className="info-card">
                  <div className="info-icon"><FaUser /></div>
                  <div className="info-details">
                    <h4>Suporte técnico</h4>
                    <p>suporte@agrotech.com</p>
                    <p className="info-small">Para clientes com plano ativo</p>
                  </div>
                </div>
              </div>

              <div className="info-redes">
                <p>Siga-nos nas redes sociais:</p>
                <div className="redes-links">
                  <a href="#" className="rede-link"><FaInstagram size={24} color="#16f29a" /></a>
                  <a href="#" className="rede-link"><FaTiktok size={24} color="#16f29a" /></a>
                  <a href="#" className="rede-link"><FaLinkedin size={24} color="#16f29a" /></a>
                </div>
              </div>
            </div>

            <div className="form-container">
              <div className="form-wrapper">
                <h3>Envie uma mensagem</h3>
                
                {formStatus.message && (
                  <div className={`form-alert ${formStatus.success ? 'success' : 'error'}`}>
                    {formStatus.success ? <FaCheckCircle /> : <FaTimesCircle />}
                    <span>{formStatus.message}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="nome">Seu nome</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Digite seu nome completo"
                      className={errors.nome ? 'error' : ''}
                      disabled={formStatus.loading}
                    />
                    {errors.nome && <span className="error-message">{errors.nome}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Seu e-mail</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Digite seu melhor e-mail"
                      className={errors.email ? 'error' : ''}
                      disabled={formStatus.loading}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="mensagem">Mensagem</label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleChange}
                      placeholder="Digite sua mensagem ou pergunta..."
                      rows="5"
                      className={errors.mensagem ? 'error' : ''}
                      disabled={formStatus.loading}
                    />
                    {errors.mensagem && <span className="error-message">{errors.mensagem}</span>}
                    <span className="char-count">{formData.mensagem.length}/500 caracteres</span>
                  </div>

                  <button type="submit" className="submit-btn" disabled={formStatus.loading}>
                    {formStatus.loading ? (
                      <><span className="spinner"></span> Enviando...</>
                    ) : 'Enviar mensagem'}
                  </button>

                  <p className="form-privacy">
                    Ao enviar, você concorda com nossa <a href="/privacidade">Política de Privacidade</a>
                  </p>
                </form>
              </div>
            </div>
          </div>

          <div className="contato-img">
            <img src="/assets/images/Mockup_cell1.png" alt="decoration" />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-col">
            <h2 className="footer-logo">AgroTech</h2>
            <p>Soluções com drones e tecnologia de precisão para monitoramento agrícola, identificação de pragas e otimização de lavouras.</p>
          </div>

          <div className="footer-col">
            <h3>Links rápidos</h3>
            <a href="#home">Início</a>
            <a href="/services">Serviços</a>
            <a href="/como-acessar">Como acessar</a>
            <a href="#contato">Contato</a>
          </div>

          <div className="footer-col">
            <h3>FAQ</h3>
            <a href="#">Como funcionam os drones?</a>
            <a href="#">Quanto custa o serviço?</a>
            <a href="#">Atendem quais regiões?</a>
            <a href="#">Como contratar?</a>
          </div>

          <div className="footer-col">
            <h3>Onde estamos</h3>
            <p><div className="centralizar-footer"><FaRegAddressCard color="#4dffbe" /> Americana - SP</div></p>
            <p>Atendimento em toda região do interior paulista.</p>
            <p><div className="centralizar-footer"><FaMailBulk color="#4dffbe" /> contato@agrotech.com</div></p>
            <p><div className="centralizar-footer"><FaPhoneAlt color="#4dffbe" /> (19) 99999-9999</div></p>
          </div>

          <div className="footer-col footer-action">
            <h3>Plataforma</h3>
            <p>Acesse o sistema para acompanhar monitoramentos e relatórios.</p>
            <a href="/app" className="footer-btn">Acessar Plataforma</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 AgroTech • Todos os direitos reservados</p>
        </div>
      </footer>
    </>
  );
}