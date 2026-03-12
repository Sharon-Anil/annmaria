import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

const Container = styled.div`
  padding: 4rem 5%;
  background: radial-gradient(circle at top right, rgba(255, 45, 107, 0.03), transparent);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4rem;
  flex-wrap: wrap;
  gap: 2rem;
  border-bottom: 1px solid var(--glass-border);
  padding-bottom: 2rem;
`;

const Title = styled.h1`
  font-family: var(--font-serif);
  color: var(--accent-gold);
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: 0;
`;

const Controls = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const Select = styled.select`
  padding: 0.8rem 1.5rem;
  background: var(--bg-secondary);
  color: #fff;
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  outline: none;
  font-family: var(--font-sans);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: var(--accent-gold);
    box-shadow: 0 0 15px rgba(255, 45, 107, 0.2);
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 3rem;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as any }
  }
};

const Shop: React.FC = () => {
  const { products } = useShop();
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('none');

  let filtered = [...products];
  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  if (sort === 'price_asc') filtered.sort((a,b) => a.price - b.price);
  if (sort === 'price_desc') filtered.sort((a,b) => b.price - a.price);

  return (
    <Container>
      <Header>
        <Title>Our Collection</Title>
        <Controls>
          <Select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="exclusive">Exclusive</option>
            <option value="casual">Casual</option>
            <option value="party">Party</option>
          </Select>
          <Select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="none">Sort By</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </Select>
        </Controls>
      </Header>

      <Grid
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={category + sort} // Re-trigger animation on filter/sort
      >
        {filtered.map(p => (
          <motion.div key={p.id} variants={itemVariants}>
            <ProductCard product={p} />
          </motion.div>
        ))}
      </Grid>
    </Container>
  );
};

export default Shop;
