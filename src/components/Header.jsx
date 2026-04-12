import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navMenuRef = useRef(null);
  const menuOverlayRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Previne scroll do body quando menu mobile estiver aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Fecha o menu ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        closeMobileMenu();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  return (
    <header>
      <h1 className="logo logo-title">AGROTECH</h1>

      {/* Botão Hamburguer */}
      <button 
        className={`hamburger ${mobileMenuOpen ? 'active' : ''}`} 
        onClick={toggleMobileMenu}
        aria-label="Menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Menu de navegação */}
      <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`} ref={navMenuRef}>
        <Link to="/" onClick={closeMobileMenu}>Home</Link>
        <Link to="/services" onClick={closeMobileMenu}>Serviços</Link>
        <Link to="/como-acessar" onClick={closeMobileMenu}>Como acessar</Link>
        <Link to="/#contato" onClick={closeMobileMenu}>Contato</Link>
        <Link to="/app" className="nav-btn" onClick={closeMobileMenu}>
          Nossa plataforma
        </Link>
      </nav>

      {/* Overlay para fechar o menu ao clicar fora */}
      <div 
        className={`menu-overlay ${mobileMenuOpen ? 'active' : ''}`} 
        onClick={closeMobileMenu}
        ref={menuOverlayRef}
      ></div>
    </header>
  );
}