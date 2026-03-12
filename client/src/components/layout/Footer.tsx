import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const FooterContainer = styled.footer`
  background-color: var(--bg-secondary);
  padding: 4rem 5% 2rem;
  border-top: 1px solid var(--glass-border);
  margin-top: 4rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const BrandBlock = styled.div`
  & h2 {
    font-size: 1.5rem;
    color: var(--accent-gold);
    margin-bottom: 1rem;
    font-family: var(--font-serif);
  }
  & p {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  & h3 {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    color: var(--text-primary);
  }

  & a {
    color: var(--text-secondary);
    font-size: 0.9rem;
    &:hover { color: var(--accent-gold); }
  }
`;

const Copyright = styled.div`
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.8rem;
  border-top: 1px solid var(--glass-border);
  padding-top: 2rem;
`;

const Footer: React.FC = () => {
  const { isLoggedIn } = useAuth();
  
  return (
    <FooterContainer>
      <FooterGrid>
        <BrandBlock>
          <h2>Boutique</h2>
          <p>Elevating personal style with carefully curated exclusive collections and custom stitching services.</p>
        </BrandBlock>

        <LinkList>
          <h3>Shop</h3>
          <Link to="/shop">All Products</Link>
          <Link to="/exclusive">Exclusive Collection</Link>
          <Link to="/stitching">Custom Stitching</Link>
        </LinkList>

        <LinkList>
          <h3>Contact</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            5GF2+XXG, SH 6, Kayamkulam<br />Kerala 690502
          </p>
          <a href="tel:8075575472">+91 80755 75472</a>
          <a href="https://wa.me/8075575472" style={{ color: '#25D366' }}>WhatsApp Us</a>
        </LinkList>

        <LinkList>
          <h3>Explore</h3>
          <Link to="/about">About Us</Link>
          <Link to="/exclusive">Signature Series</Link>
          <Link to="/stitching">Custom Stitching</Link>
          {isLoggedIn && <Link to="/orders">Track Your Order</Link>}
        </LinkList>
      </FooterGrid>

      <Copyright>
        <p style={{ marginBottom: '10px' }}>&copy; {new Date().getFullYear()} Ann Maria Boutique. All Rights Reserved.</p>
        <p style={{ opacity: 0.5, fontSize: '0.7rem' }}>Kayamkulam, Kerala, India</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
