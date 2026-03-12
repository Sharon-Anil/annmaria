import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { useShop, type Product } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const Card = styled(motion.div)`
  background: var(--bg-secondary);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--glass-border);
  position: relative;
  isolation: isolate;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 215, 0, 0.1) 0%,
      transparent 50%,
      rgba(255, 45, 107, 0.05) 100%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: 1;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
`;

const Image = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 2rem;
  gap: 1.5rem;
  z-index: 2;
`;

const ActionButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: var(--accent-gold);
    color: #000;
    border-color: var(--accent-gold);
  }
`;

const Info = styled.div`
  padding: 1.5rem;
  background: var(--bg-secondary);
  position: relative;
  z-index: 2;
`;

const Category = styled.span`
  font-size: 0.75rem;
  color: var(--accent-gold);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  margin: 0.5rem 0;
  font-family: var(--font-serif);
  color: #fff;
`;

const Price = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--accent-gold);
`;

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const isWishlisted = wishlist.some(p => p.id === product.id);

  return (
    <Card
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.5 }}
    >
      <ImageContainer>
        <Image 
          src={product.image} 
          alt={product.name}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        />
        <Overlay
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ActionButton 
            onClick={() => addToCart(product)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingBag size={22} />
          </ActionButton>
          <ActionButton 
            onClick={() => toggleWishlist(product)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart 
              size={22} 
              fill={isWishlisted ? "var(--accent-gold)" : "none"} 
              color={isWishlisted ? "var(--accent-gold)" : "currentColor"} 
            />
          </ActionButton>
        </Overlay>
      </ImageContainer>
      <Info>
        <Category>{product.category}</Category>
        <Link to={`/shop/${product.id}`} style={{ textDecoration: 'none' }}>
          <Title>{product.name}</Title>
        </Link>
        <Price>₹{product.price.toLocaleString()}</Price>
      </Info>
    </Card>
  );
};

export default ProductCard;
