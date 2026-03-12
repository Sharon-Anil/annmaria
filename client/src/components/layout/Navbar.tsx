import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ShoppingBag, Heart, Menu, X, User } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const NavHeader = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  z-index: 1000;
  background: ${props => props.$scrolled ? 'var(--bg-primary)' : 'rgba(10,10,10,0.8)'};
  backdrop-filter: blur(10px);
  box-shadow: ${props => props.$scrolled ? '0 2px 20px rgba(0,0,0,0.5)' : 'none'};
  transition: all var(--transition-normal);
  border-bottom: 1px solid var(--glass-border);
`;

const Logo = styled(Link)`
  font-family: var(--font-serif);
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--accent-gold);
`;

const DesktopNav = styled.nav`
  display: none;
  gap: 2rem;
  
  @media (min-width: 1024px) {
    display: flex;
  }
`;

const NavLink = styled(Link) <{ $active?: boolean }>`
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  position: relative;
  color: ${p => p.$active ? 'var(--accent-gold)' : 'var(--text-primary)'};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${p => p.$active ? '100%' : '0'};
    height: 2px;
    background: var(--accent-gold);
    transition: width 0.3s ease;
  }
  
  &:hover::after { width: 100%; }
`;

const IconGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

const IconButton = styled(Link)`
  position: relative;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover { 
    color: var(--accent-gold);
    transform: translateY(-2px);
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--accent-gold), #ff2d6b);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: white;
  border: 2px solid var(--glass-border);
`;

const Badge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ff2d6b;
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(255,45,107,0.5);
`;

const MobileMenuWrapper = styled(motion.div)`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: var(--bg-primary);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  padding: 100px 5%;
  gap: 1.5rem;
`;

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cart } = useShop();
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <NavHeader $scrolled={scrolled}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Menu
            className="mobile-btn"
            style={{ display: 'none', cursor: 'pointer' }}
            onClick={() => setMobileOpen(true)}
          />
          <Logo to="/">Ann Maria</Logo>
        </div>

        <DesktopNav>
          <NavLink to="/" $active={location.pathname === '/'}>Home</NavLink>
          <NavLink to="/shop" $active={location.pathname === '/shop'}>Shop</NavLink>
          <NavLink to="/exclusive" $active={location.pathname === '/exclusive'}>Exclusive</NavLink>
          <NavLink to="/stitching" $active={location.pathname === '/stitching'}>Custom Stitching</NavLink>
          {isLoggedIn && <NavLink to="/orders" $active={location.pathname === '/orders'}>Track Order</NavLink>}
          <NavLink to="/about" $active={location.pathname === '/about'}>About Us</NavLink>
        </DesktopNav>

        <IconGroup>
          {isLoggedIn ? (
            <IconButton to="/profile" title="Profile">
              <Avatar>{user?.name.charAt(0)}</Avatar>
            </IconButton>
          ) : (
            <IconButton to="/login" title="Login"><User size={20} /></IconButton>
          )}
          <IconButton to="/wishlist" title="Wishlist"><Heart size={20} /></IconButton>
          <IconButton to="/cart" title="Shopping Bag">
            <ShoppingBag size={20} />
            {totalItems > 0 && <Badge>{totalItems}</Badge>}
          </IconButton>
        </IconGroup>
      </NavHeader>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenuWrapper
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div style={{ position: 'absolute', top: 25, right: '5%' }}>
              <X size={32} cursor="pointer" onClick={() => setMobileOpen(false)} />
            </div>
            <NavLink to="/" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.5rem' }}>Home</NavLink>
            <NavLink to="/shop" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.5rem' }}>Shop Collection</NavLink>
            <NavLink to="/exclusive" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.5rem' }}>Exclusives</NavLink>
            <NavLink to="/stitching" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.5rem' }}>Personalized Stitching</NavLink>
            {isLoggedIn && <NavLink to="/orders" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.5rem' }}>Track Order</NavLink>}
            <NavLink to="/about" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.5rem' }}>About Us</NavLink>

            <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '10px 0' }} />

            {isLoggedIn ? (
              <NavLink to="/profile" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.5rem', color: 'var(--accent-gold)' }}>My Profile</NavLink>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.5rem' }}>Login</NavLink>
                <NavLink to="/signup" onClick={() => setMobileOpen(false)} style={{ fontSize: '1.5rem' }}>Join the Boutique</NavLink>
              </>
            )}
          </MobileMenuWrapper>
        )}
      </AnimatePresence>
      <style>{`@media(max-width: 1024px) { .mobile-btn { display: block !important; } }`}</style>
    </>
  );
};

export default Navbar;
