import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, CreditCard, Settings, LogOut, Package, User, ChevronRight, Truck, Layout as LayoutIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 5% 80px;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const ProfileTitle = styled.h1`
  font-family: var(--font-serif);
  font-size: 3rem;
  color: var(--text-primary);
`;

const ProfileCard = styled.div`
  background: var(--bg-tertiary);
  border: 1px solid var(--glass-border);
  border-radius: 30px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 50px;
  }
`;

const AvatarCircle = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background: linear-gradient(135deg, var(--accent-gold), #ff2d6b);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
  font-weight: 700;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
`;

const UserInfo = styled.div`
  flex: 1;
  h2 { font-size: 2rem; margin-bottom: 10px; font-family: var(--font-serif); }
  p { color: var(--text-secondary); font-size: 1.1rem; }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 50px;
`;

const StatCard = styled(motion.div)`
  background: rgba(255,255,255,0.03);
  padding: 30px;
  border-radius: 20px;
  border: 1px solid var(--glass-border);
  text-align: center;
  cursor: pointer;
  
  &:hover { background: rgba(255,255,255,0.06); }
  
  h3 { font-size: 2.5rem; color: var(--accent-gold); margin-bottom: 10px; font-family: var(--font-serif); }
  p { text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; color: var(--text-secondary); font-weight: 600; }
`;

const TabSection = styled.div`
  margin-top: 60px;
`;

const TabNav = styled.div`
  display: flex;
  gap: 30px;
  border-bottom: 1px solid var(--glass-border);
  margin-bottom: 40px;
`;

const TabButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  border-bottom: ${p => p.$active ? '3px solid var(--accent-gold)' : '3px solid transparent'};
  color: ${p => p.$active ? 'var(--accent-gold)' : 'var(--text-secondary)'};
  padding: 10px 0;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover { color: var(--accent-gold); }
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const OrderCard = styled(motion.div)`
  background: var(--bg-tertiary);
  padding: 30px;
  border-radius: 20px;
  border: 1px solid var(--glass-border);
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @media (min-width: 900px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const OrderInfo = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const OrderIcon = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(255,255,255,0.05);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-gold);
`;

const OrderDetails = styled.div`
  h4 { font-size: 1.2rem; margin-bottom: 5px; }
  p { color: var(--text-secondary); font-size: 0.9rem; }
`;

const OrderStatus = styled.div<{ $status: string }>`
  padding: 8px 16px;
  border-radius: 99px;
  background: ${p => p.$status === 'Shipped' ? 'rgba(0,255,0,0.1)' : 'rgba(255,165,0,0.1)'};
  color: ${p => p.$status === 'Shipped' ? '#4ade80' : '#fb923c'};
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const TrackingLine = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--accent-gold);
  font-weight: 600;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const ActionCard = styled(motion.div)`
  background: var(--bg-tertiary);
  padding: 30px;
  border-radius: 20px;
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  
  &:hover { border-color: var(--accent-gold); background: rgba(255,255,255,0.03); }
`;

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const { orders } = useShop();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Container>
      <Header>
        <ProfileTitle>User Profile</ProfileTitle>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          style={{ background: 'rgba(255,25,25,0.1)', color: '#ff4b4b', border: '1px solid rgba(255,25,25,0.2)', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <LogOut size={18} /> Logout
        </motion.button>
      </Header>

      <ProfileCard>
        <AvatarCircle>
          {user.name.charAt(0)}
        </AvatarCircle>
        <UserInfo>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LayoutIcon size={16} /> Member since 2024
          </p>
        </UserInfo>
      </ProfileCard>

      <StatsGrid>
        <StatCard whileHover={{ y: -5 }}>
          <h3>{orders.length}</h3>
          <p>Total Orders</p>
        </StatCard>
        <StatCard whileHover={{ y: -5 }}>
          <h3>4.9/5</h3>
          <p>User Rating</p>
        </StatCard>
        <StatCard whileHover={{ y: -5 }}>
          <h3>Signature</h3>
          <p>Member Status</p>
        </StatCard>
      </StatsGrid>

      <TabSection>
        <TabNav>
          <TabButton $active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>Recent Orders</TabButton>
          <TabButton $active={activeTab === 'payments'} onClick={() => setActiveTab('payments')}>Payment History</TabButton>
          <TabButton $active={activeTab === 'advanced'} onClick={() => setActiveTab('advanced')}>Advanced Options</TabButton>
        </TabNav>

        <AnimatePresence mode="wait">
          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <OrderList>
                {orders.length > 0 ? orders.map((order, idx) => (
                  <OrderCard key={idx} whileHover={{ x: 10 }}>
                    <OrderInfo>
                      <OrderIcon><Package size={28} /></OrderIcon>
                      <OrderDetails>
                        <h4>Order #{order.id || 'ORD-2025-' + idx}</h4>
                        <p>{order.date || 'Today'}</p>
                        <p>Total Items: {Array.isArray(order.items) ? order.items.length : (order.items || 0)} • ₹{order.total?.toLocaleString()}</p>
                      </OrderDetails>
                    </OrderInfo>
                    <OrderStatus $status={order.status}>{order.status}</OrderStatus>
                    <TrackingLine onClick={() => navigate('/orders')}>
                      Track Order <Truck size={18} /> <ChevronRight size={18} />
                    </TrackingLine>
                  </OrderCard>
                )) : (
                  <div style={{ textAlign: 'center', padding: '100px', background: 'var(--bg-tertiary)', borderRadius: '30px' }}>
                    <ShoppingBag size={64} style={{ opacity: 0.2, marginBottom: '20px' }} />
                    <h3>No orders yet</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Start shopping to see your orders here!</p>
                  </div>
                )}
              </OrderList>
            </motion.div>
          )}

          {activeTab === 'payments' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Grid>
                <ActionCard whileHover={{ y: -5 }}>
                  <CreditCard size={32} color="var(--accent-gold)" />
                  <div>
                    <h4>Saved Cards</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Manage your payment methods</p>
                  </div>
                </ActionCard>
                <ActionCard whileHover={{ y: -5 }}>
                  <ShoppingBag size={32} color="var(--accent-gold)" />
                  <div>
                    <h4>Transaction History</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Detailed history of all payments</p>
                  </div>
                </ActionCard>
              </Grid>
            </motion.div>
          )}

          {activeTab === 'advanced' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Grid>
                <ActionCard whileHover={{ y: -5 }}>
                  <Settings size={32} color="var(--accent-gold)" />
                  <div>
                    <h4>Account Settings</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Security and privacy preference</p>
                  </div>
                </ActionCard>
                <ActionCard whileHover={{ y: -5 }}>
                  <User size={32} color="var(--accent-gold)" />
                  <div>
                    <h4>Address Book</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Saved delivery locations</p>
                  </div>
                </ActionCard>
              </Grid>
            </motion.div>
          )}
        </AnimatePresence>
      </TabSection>
    </Container>
  );
};

export default Profile;
