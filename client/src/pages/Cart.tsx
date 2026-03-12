import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 3rem 5%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-family: var(--font-serif);
  color: var(--accent-gold);
  margin-bottom: 2rem;
`;

const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CartItemRow = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: var(--bg-secondary);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--glass-border);
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const ItemPrice = styled.p`
  color: var(--accent-gold);
  font-weight: 600;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--bg-primary);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
`;

const IconButton = styled.button`
  color: var(--text-primary);
  &:hover { color: var(--accent-gold); }
`;

const SummaryPanel = styled.div`
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--glass-border);
  height: fit-content;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  
  &.total {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--accent-gold);
    border-top: 1px solid var(--glass-border);
    padding-top: 1rem;
    margin-top: 1rem;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: var(--accent-gold);
  color: var(--bg-primary);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 2rem;
  border-radius: 4px;
  
  &:hover {
    background: var(--accent-gold-hover);
  }
`;

const Cart: React.FC = () => {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useShop();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <Container>
        <Title>Your Cart is Empty</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Shopping Cart</Title>
      <CartLayout>
        <CartItems>
          {cart.map(item => (
            <CartItemRow key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>₹{item.price.toFixed(2)}</ItemPrice>
              </ItemInfo>
              <QuantityControls>
                <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={16} /></IconButton>
                <span>{item.quantity}</span>
                <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={16} /></IconButton>
              </QuantityControls>
              <IconButton onClick={() => removeFromCart(item.id)} style={{ color: '#ff4d4d' }}>
                <Trash2 size={20} />
              </IconButton>
            </CartItemRow>
          ))}
        </CartItems>

        <SummaryPanel>
          <h2>Order Summary</h2>
          <div style={{ marginTop: '2rem' }}>
            <SummaryRow>
              <span>Subtotal</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Shipping</span>
              <span>Free</span>
            </SummaryRow>
            <SummaryRow className="total">
              <span>Total</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </SummaryRow>
            <CheckoutButton onClick={handleCheckout}>
              Proceed to Checkout
            </CheckoutButton>
          </div>
        </SummaryPanel>
      </CartLayout>
    </Container>
  );
};

export default Cart;
