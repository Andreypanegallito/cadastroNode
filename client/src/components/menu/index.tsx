import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'



import './menu.scss';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { LinksMenu } from '../../utils/menu';


const Menu = ({ links }: LinksMenu) => {
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

  function geraLinksMenu() {
    if (links.length > 0) {
      return links.map((link, index) => (
        <li className='nav-item' key={index}>
          <Link
            to={link.url}
            className='nav-link'
            onClick={ativaDesativaMenu}>
            {link.text}
          </Link>
        </li>
      ));
    }
    else {
      return (
        <li className="nav-item">
          <Link to="/"
            className='nav-link current'
            onClick={ativaDesativaMenu}>
            Home
          </Link>
        </li>
      );
    }
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
          {geraLinksMenu()}
        </ul>
      </nav>
    </header>
  )
}

export default Menu;