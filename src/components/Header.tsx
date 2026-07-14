import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logoPng from '../../swag_logo.png';

const navItems = [
  { label: 'What is SWAG?', path: '/about', accent: 'green' },
  { label: 'Member', path: '/members', accent: 'blue' },
  { label: 'Activity', path: '/activities', accent: 'green' },
  { label: 'Peer Mentor', path: '/peer-mentor', accent: 'pink' },
  { label: 'Form', path: '/form', accent: 'pink' },
  { label: 'Home', path: '/', accent: 'blue' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <NavLink to="/" className="logo-link" aria-label="SWAG home" onClick={() => setIsOpen(false)}>
        <img src={logoPng} alt="SWAG official logo" />
      </NavLink>
      <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={isOpen} onClick={() => setIsOpen((value) => !value)}>
        {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <nav className={isOpen ? 'open' : ''} aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `nav-link accent-${item.accent}${isActive ? ' active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
