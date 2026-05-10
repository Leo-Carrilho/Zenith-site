// components/Header.jsx
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes, FaLeaf } from "react-icons/fa";

export default function Header({ onInstallClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const closeMenu = () => setMenuOpen(false);

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
    <>
      <div
        className={`menu-overlay ${menuOpen ? "active" : ""}`}
        onClick={closeMenu}
      />

      <header ref={headerRef}>
        <div className="header-circuit-line" />

        <a href="#hero" className="logo" onClick={closeMenu}>
          <img className="logo-img" src="/assets/images/Logo-redonda.png" alt="Zenith" />Zenith
        </a>

        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>

        <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <a href="#hero" onClick={closeMenu}>Início</a>
          <a href="#servicos" onClick={closeMenu}>Serviços</a>
          <a href="#como-funciona" onClick={closeMenu}>Como Funciona</a>
          <a href="#planos" onClick={closeMenu}>Planos</a>
          <a href="#contato" onClick={closeMenu}>Contato</a>
          <button className="nav-btn" onClick={handlePlatformAccess}>
            Acessar Plataforma
          </button>
        </nav>
      </header>
    </>
  );
}