import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';

const Container = styled.div`
  padding: 4rem 5%;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-family: var(--font-serif);
  color: var(--accent-gold);
  margin-bottom: 3rem;
`;

const OrderCard = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--glass-border);
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const OrderId = styled.span`
  font-weight: 700;
  color: var(--accent-gold);
`;

const StatusPill = styled.span<{ $status: string }>`
  background: ${props => {
    switch (props.$status) {
      case 'Delivered': return 'rgba(76, 175, 80, 0.1)';
      case 'Shipped': return 'rgba(33, 150, 243, 0.1)';
      default: return 'rgba(255, 152, 0, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'Delivered': return '#4caf50';
      case 'Shipped': return '#2196f3';
      default: return '#ff9800';
    }
  }};
  padding: 0.4rem 1rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const TrackingTrack = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 3rem 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--bg-tertiary);
    z-index: 1;
  }
`;

const TrackStep = styled.div<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  z-index: 2;
  color: ${props => props.$active ? 'var(--accent-gold)' : 'var(--text-secondary)'};
`;

const IconWrap = styled.div<{ $active: boolean }>`
  width: 32px;
  height: 32px;
  background: ${props => props.$active ? 'var(--accent-gold)' : 'var(--bg-tertiary)'};
  color: ${props => props.$active ? '#000' : 'var(--text-secondary)'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.$active ? '0 0 15px var(--accent-gold)' : 'none'};
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ItemThumb = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

const Orders: React.FC = () => {
  const { orders } = useShop();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  // Mock steps logic
  const getStepIndex = (status: string) => {
    switch (status) {
      case 'Confirmed': return 0;
      case 'Processing': return 1;
      case 'Shipped': return 2;
      case 'Delivered': return 3;
      default: return 0;
    }
  };

  if (!isLoggedIn) return null;

  return (
    <Container>
      <Title>My Orders</Title>

      {orders.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>You haven't placed any orders yet.</p>
      ) : (
        orders.map((order, i) => {
          const currentIndex = getStepIndex(order.status);
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <OrderCard>
                <OrderHeader>
                  <div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Order ID</p>
                    <OrderId>{order.id}</OrderId>
                  </div>
                  <div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Placed On</p>
                    <span style={{ fontWeight: '500' }}>{order.date}</span>
                  </div>
                  <StatusPill $status={order.status}>{order.status}</StatusPill>
                </OrderHeader>

                <TrackingTrack>
                  {[
                    { label: 'Confirmed', icon: CheckCircle },
                    { label: 'Processing', icon: Clock },
                    { label: 'Shipped', icon: Truck },
                    { label: 'Delivered', icon: Package },
                  ].map((step, idx) => (
                    <TrackStep key={step.label} $active={idx <= currentIndex}>
                      <IconWrap $active={idx <= currentIndex}>
                        <step.icon size={18} />
                      </IconWrap>
                      <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>{step.label}</span>
                    </TrackStep>
                  ))}
                </TrackingTrack>

                <ItemList>
                  {Array.isArray(order.items) ? (
                    order.items.map((item: any) => (
                      <OrderItem key={item.id}>
                        <ItemThumb src={item.image} />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: '600' }}>{item.name}</p>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Qty: {item.quantity}</p>
                        </div>
                        <p style={{ fontWeight: '700' }}>₹{(item.price * item.quantity).toFixed(2)}</p>
                      </OrderItem>
                    ))
                  ) : (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      {order.items || 0} items in this order.
                    </p>
                  )}
                </ItemList>

                {order.address && (
                  <div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '8px',
                    border: '1px solid var(--glass-border)'
                  }}>
                    <p style={{ color: 'var(--accent-gold)', fontWeight: '700', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Shipping Details</p>
                    <p style={{ fontWeight: '600' }}>{order.address.name}</p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{order.address.fullAddress}</p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{order.address.city}, {order.address.state} - {order.address.pincode}</p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '0.5rem' }}>📞 {order.address.phone}</p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '0.5rem' }}>
                      💳 Payment: <strong style={{ textTransform: 'uppercase' }}>{order.paymentMethod}</strong>
                    </p>
                  </div>
                )}

                <div style={{
                  marginTop: '2rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid var(--glass-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>Total Amount</span>
                  <span style={{ fontWeight: '700', fontSize: '1.5rem', color: 'var(--accent-gold)' }}>
                    ₹{order.total.toLocaleString()}
                  </span>
                </div>
              </OrderCard>
            </motion.div>
          );
        })
      )}
    </Container>
  );
};

export default Orders;
