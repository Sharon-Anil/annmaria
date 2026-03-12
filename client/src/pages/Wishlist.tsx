import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 4rem 5%;
  min-height: 60vh;
`;

const Title = styled.h1`
  font-family: var(--font-serif);
  color: var(--accent-gold);
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 5rem 0;
  color: var(--text-secondary);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const WishCard = styled(motion.div)`
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--glass-border);
  position: relative;
`;

const ImageWrap = styled.div`
  height: 350px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  &:hover img { transform: scale(1.05); }
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const ItemName = styled.h3`
  font-family: var(--font-serif);
  margin-bottom: 0.5rem;
`;

const Price = styled.p`
  color: var(--accent-gold);
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const AddBtn = styled.button`
  flex: 1;
  background: var(--accent-gold);
  color: #000;
  border: none;
  padding: 0.8rem;
  border-radius: 6px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  &:hover { background: var(--accent-gold-hover); }
`;

const RemoveBtn = styled.button`
  width: 45px;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border: 1px solid var(--glass-border);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover { color: #ff4d4d; border-color: #ff4d4d; }
`;

const Wishlist: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  if (wishlist.length === 0) {
    return (
      <Container>
        <Title><Heart size={32} /> My Wishlist</Title>
        <EmptyState>
          <Heart size={60} style={{ opacity: 0.2, marginBottom: '1.5rem' }} />
          <h3>Your wishlist is empty</h3>
          <p style={{ margin: '1rem 0 2rem' }}>Save items you love to find them later!</p>
          <Link to="/shop">
            <AddBtn style={{ maxWidth: '200px', margin: '0 auto' }}>Go Shopping</AddBtn>
          </Link>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Title><Heart size={32} fill="var(--accent-gold)" /> My Wishlist ({wishlist.length})</Title>
      
      <Grid>
        <AnimatePresence>
          {wishlist.map(product => (
            <WishCard
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <ImageWrap>
                <img src={product.image} alt={product.name} />
              </ImageWrap>
              <Content>
                <ItemName>{product.name}</ItemName>
                <Price>₹{product.price}</Price>
                <ActionRow>
                  <AddBtn onClick={() => {
                    addToCart(product);
                    toggleWishlist(product);
                  }}>
                    <ShoppingBag size={18} /> Add to Cart
                  </AddBtn>
                  <RemoveBtn onClick={() => toggleWishlist(product)}>
                    <Trash2 size={18} />
                  </RemoveBtn>
                </ActionRow>
              </Content>
            </WishCard>
          ))}
        </AnimatePresence>
      </Grid>
    </Container>
  );
};

export default Wishlist;
