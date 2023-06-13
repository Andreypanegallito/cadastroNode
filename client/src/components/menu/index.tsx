import React, { useEffect } from 'react';

import './menu.scss';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

const Menu = () => {
  useEffect(() => {
    function handleScroll() {
      const elementos = document.querySelectorAll('.initial');
      const btnMenu = document.querySelector('#btn-menu') as HTMLDivElement;

      elementos.forEach(elemento => {
        const rect = elemento.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        isVisible ? btnMenu?.classList.remove('cor-fundo') : btnMenu?.classList.add('cor-fundo');
      });
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function ativaDesativaMenu() {
    document.body.classList.toggle('active');
  }
  return (
    <header>
      <div id='btn-menu' className="btn-menu" onClick={ativaDesativaMenu}>
        <FaBars />
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item btn-fecha-menu">
            <a>
              <AiOutlineClose color='#fff' onClick={ativaDesativaMenu} />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link current" href="#initial" onClick={ativaDesativaMenu}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#about" onClick={ativaDesativaMenu}>
              Sobre
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#hability" onClick={ativaDesativaMenu}>
              Habilidades
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#scholarity" onClick={ativaDesativaMenu}>
              Experiências
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#experience" onClick={ativaDesativaMenu}>
              Experiências profissionais
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#footer" onClick={ativaDesativaMenu}>
              Redes
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Menu;