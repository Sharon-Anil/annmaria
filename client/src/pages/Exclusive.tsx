import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

const Container = styled.div`
  padding: 6rem 5%;
  background: radial-gradient(circle at top right, rgba(255, 45, 107, 0.05), transparent),
              radial-gradient(circle at bottom left, rgba(255, 215, 0, 0.03), transparent);
`;

const Header = styled.div`
  margin-bottom: 5rem;
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-family: var(--font-serif);
  font-size: clamp(3rem, 8vw, 5rem);
  background: linear-gradient(to right, var(--accent-gold), #fff, var(--accent-gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  font-weight: 700;
`;

const Subtitle = styled(motion.p)`
  font-family: var(--font-sans);
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.8;
  letter-spacing: 0.5px;
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 4rem;
`;

const ExclusiveCardWrapper = styled(motion.div)`
  position: relative;
  
  &::before {
    content: 'EXCLUSIVE';
    position: absolute;
    top: -15px;
    right: 20px;
    background: var(--accent-gold);
    color: #000;
    font-size: 0.7rem;
    font-weight: 900;
    padding: 4px 12px;
    border-radius: 4px;
    z-index: 10;
    letter-spacing: 2px;
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 12 }
  }
};

const Exclusive: React.FC = () => {
  const { products } = useShop();
  const exclusiveProducts = products.filter(p => p.category === 'exclusive');

  return (
    <Container>
      <Header>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Signature Series
        </Title>
        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Experience the pinnacle of luxury. Each piece in our signature series is 
          a unique work of art, meticulously crafted for the most discerning connoisseurs.
        </Subtitle>
      </Header>

      <Grid
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.5)' }}>
            Loading signature collection...
          </div>
        ) : exclusiveProducts.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.5)' }}>
            Our exclusive collection is currently being curated. Please check back soon.
          </div>
        ) : (
          exclusiveProducts.map(p => (
            <ExclusiveCardWrapper key={p.id} variants={itemVariants}>
              <ProductCard product={p} />
            </ExclusiveCardWrapper>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Exclusive;
