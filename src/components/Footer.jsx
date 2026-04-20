// components/Footer.jsx
import { FaLeaf, FaRegAddressCard, FaMailBulk, FaPhoneAlt } from "react-icons/fa";

export default function Footer({ onInstallClick }) {
  const handlePlatformAccess = () => {
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
        alert('📱 Para instalar no iPhone: Toque no botão Compartilhar e depois "Adicionar à Tela de Início"');
        window.open(PWA_URL, '_blank');
      } else {
        window.open(PWA_URL, '_blank');
      }
    }
  };

  return (
    <footer className="footer">
      <div className="footer-circuit" />
      <div className="footer-container">
        <div className="footer-col">
          <h2 className="footer-logo"><FaLeaf /> Zenith</h2>
          <p> Monitoramento e manejo de plantio, detecção de pragas, análise de solo e muito mais. Tudo com a precisão e eficiência que só a tecnologia pode oferecer.</p>
        </div>
        <div className="footer-col">
          <h3>Links rápidos</h3>
          <a href="#hero">Início</a>
          <a href="#servicos">Serviços</a>
          <a href="#como-funciona">Como Funciona</a>
          <a href="#planos">Planos</a>
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
          <p><span className="centralizar-footer"><FaRegAddressCard /> Americana — SP</span></p>
          <p>Interior paulista e região.</p>
          <p><span className="centralizar-footer"><FaMailBulk /> contato@agrotech.com</span></p>
          <p><span className="centralizar-footer"><FaPhoneAlt /> (19) 99999-9999</span></p>
        </div>
        <div className="footer-col footer-action">
          <h3>Plataforma</h3>
          <p>Acompanhe monitoramentos e relatórios em tempo real.</p>
          <button className="footer-btn" onClick={handlePlatformAccess}>
            Acessar Plataforma
          </button>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 AgroTech • Todos os direitos reservados • Americana — SP</p>
      </div>
    </footer>
  );
}