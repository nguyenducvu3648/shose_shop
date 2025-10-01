import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Plus, List } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <ShoppingBag size={28} />
          <span>Shoe Store Management</span>
        </div>
        <nav className="nav">
          <Link 
            to="/" 
            className={isActive('/') ? 'active' : ''}
          >
            <List size={16} />
            Danh sách giày
          </Link>
          <Link 
            to="/add" 
            className={isActive('/add') ? 'active' : ''}
          >
            <Plus size={16} />
            Thêm giày
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
