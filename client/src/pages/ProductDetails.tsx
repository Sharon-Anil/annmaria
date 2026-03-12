import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useShop, type Product } from '../context/ShopContext';
import { ShoppingBag, Star, ArrowLeft } from 'lucide-react';

const Container = styled.div`
  padding: 3rem 5%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled(motion.div)`
  width: 100%;
  height: 600px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--glass-border);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoPanel = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Category = styled.p`
  color: var(--accent-gold);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-family: var(--font-serif);
  margin-bottom: 1rem;
`;

const PriceLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Price = styled.span`
  font-size: 1.8rem;
  color: var(--text-primary);
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent-gold);
`;

const Description = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 3rem;
`;

const AddToCartBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--accent-gold);
  color: var(--bg-primary);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 4px;
  font-size: 1.1rem;
  
  &:hover { background: var(--accent-gold-hover); }
`;

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useShop();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Ideally we would fetch single product from API, but context holds it already
    const found = products.find(p => p.id === id);
    if (found) setProduct(found);
  }, [id, products]);

  if (!product) return <Container>Loading...</Container>;

  return (
    <Container>
      <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        <ArrowLeft size={20} /> Back to Shop
      </Link>
      <Layout>
        <ImageContainer initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Image src={product.image} alt={product.name} />
        </ImageContainer>
        <InfoPanel initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Category>{product.category}</Category>
          <Title>{product.name}</Title>
          <PriceLayout>
            <Price>₹{product.price.toLocaleString()}</Price>
            <RatingRow>
              <Star size={20} fill="currentColor" />
              <span>{product.rating} / 5</span>
            </RatingRow>
          </PriceLayout>
          
          <Description>{product.description}</Description>

          <AddToCartBtn onClick={() => addToCart(product)}>
            <ShoppingBag size={24} />
            Add to Cart
          </AddToCartBtn>
        </InfoPanel>
      </Layout>
    </Container>
  );
};

export default ProductDetails;
