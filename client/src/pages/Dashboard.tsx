import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, PackageSearch, Users, ShoppingCart, Settings, LogOut, ExternalLink, Plus, Edit, Trash2, ArrowUpRight, TrendingUp } from 'lucide-react';

const AdminWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: #09090b;
  color: #fff;
  font-family: 'Inter', sans-serif;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    overflow-y: auto;
  }
`;

const Sidebar = styled.aside`
  width: 280px;
  background: rgba(20, 20, 22, 0.8);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  z-index: 10;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding: 1rem 0;
  }
`;

const Brand = styled.div`
  padding: 0 2rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  h2 {
    font-family: var(--font-serif, 'Playfair Display', serif);
    font-size: 1.8rem;
    background: linear-gradient(135deg, #d4af37, #f3e5ab);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
  }
  
  span {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: #888;
    font-weight: 600;
  }
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1rem;
  flex: 1;
`;

const NavItem = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem 1.5rem;
  background: ${props => props.$active ? 'rgba(212, 175, 55, 0.1)' : 'transparent'};
  color: ${props => props.$active ? '#d4af37' : '#888'};
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.03);
  }

  ${props => props.$active && `
    &::after {
      content: '';
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #d4af37;
      box-shadow: 0 0 10px #d4af37;
    }
  `}
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem 3rem;
  overflow-y: auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -200px;
    left: -200px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 60%);
    z-index: 0;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    overflow-y: visible;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 2rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: -0.5px;
  color: #fff;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    width: 100%;
    
    button {
      flex: 1;
      justify-content: center;
      text-align: center;
    }
  }
`;

const PremiumButton = styled.button<{ $primary?: boolean }>`
  background: ${p => p.$primary ? 'linear-gradient(135deg, #d4af37, #b89025)' : 'rgba(255,255,255,0.05)'};
  color: ${p => p.$primary ? '#000' : '#fff'};
  border: 1px solid ${p => p.$primary ? 'transparent' : 'rgba(255,255,255,0.1)'};
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${p => p.$primary ? '0 10px 20px rgba(212, 175, 55, 0.2)' : '0 10px 20px rgba(0,0,0,0.2)'};
    background: ${p => !p.$primary && 'rgba(255,255,255,0.08)'};
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
`;

const MetricCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 1.8rem;
  backdrop-filter: blur(10px);
`;

const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  color: #888;
  font-size: 0.95rem;
  font-weight: 500;
`;

const MetricValue = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: baseline;
  gap: 1rem;

  span {
    font-size: 0.85rem;
    color: #4ade80;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    background: rgba(74, 222, 128, 0.1);
    padding: 0.2rem 0.6rem;
    border-radius: 99px;
  }
`;

const DataSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 1rem;

  th {
    text-align: left;
    padding: 1rem 1.5rem;
    color: #888;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  td {
    padding: 1.2rem 1.5rem;
    color: #ccc;
    font-size: 0.95rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    vertical-align: middle;
  }

  tr:hover td {
    background: rgba(255, 255, 255, 0.01);
  }
`;

const StatusPill = styled.span<{ $status: string }>`
  padding: 0.4rem 0.8rem;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  ${p => p.$status === 'Delivered' && `background: rgba(74, 222, 128, 0.1); color: #4ade80;`}
  ${p => p.$status === 'Shipped' && `background: rgba(96, 165, 250, 0.1); color: #60a5fa;`}
  ${p => p.$status === 'Processing' && `background: rgba(251, 191, 36, 0.1); color: #fbbf24;`}
  ${p => p.$status === 'Pending' && `background: rgba(248, 113, 113, 0.1); color: #f87171;`}
`;

const FormGrid = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    
    & > div {
      grid-column: span 1 !important;
    }
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  label {
    font-size: 0.85rem;
    color: #888;
    font-weight: 500;
  }

  input, select, textarea {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 1rem;
    color: #fff;
    font-size: 0.95rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #d4af37;
      box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!user || user.email !== 'annmaria') {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user || user.email !== 'annmaria') return;

    fetch('http://localhost:5000/api/reports/dashboard')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(console.error);

    fetch('http://localhost:5000/api/orders')
      .then(res => res.json())
      .then(o => setOrders(o))
      .catch(console.error);

    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(p => setProducts(p))
      .catch(console.error);
  }, [user]);

  if (!user || user.email !== 'annmaria') return null;

  if (!data) return <AdminWrapper style={{ alignItems: 'center', justifyContent: 'center' }}><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Settings size={40} color="#d4af37" /></motion.div></AdminWrapper>;

  const tabTitles: Record<string, string> = {
    overview: 'Executive Dashboard',
    products: 'Inventory Management',
    orders: 'Order Fulfillment',
    add: 'Publish New Collection'
  };

  return (
    <AdminWrapper>
      <Sidebar>
        <Brand>
          <h2>Ann Maria</h2>
          <span>Admin Portal</span>
        </Brand>

        <NavList>
          <NavItem $active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
            <LayoutDashboard size={20} /> Overview
          </NavItem>
          <NavItem $active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>
            <ShoppingCart size={20} /> Orders <span style={{ marginLeft: 'auto', background: '#d4af37', color: '#000', padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 700 }}>{orders.length}</span>
          </NavItem>
          <NavItem $active={activeTab === 'products'} onClick={() => setActiveTab('products')}>
            <PackageSearch size={20} /> Inventory
          </NavItem>
          <NavItem $active={activeTab === 'add'} onClick={() => setActiveTab('add')}>
            <Plus size={20} /> Add Product
          </NavItem>
          <NavItem>
            <Users size={20} /> Customers
          </NavItem>
          <NavItem>
            <Settings size={20} /> Settings
          </NavItem>
        </NavList>

        <div style={{ padding: '0 2rem', marginTop: 'auto' }}>
          <div style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.1)', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
             <img src="/admin_avatar.png" alt="Admin" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #d4af37' }} />
             <div>
               <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>Ann Maria</p>
               <p style={{ margin: 0, fontSize: '0.75rem', color: '#d4af37' }}>Super Admin</p>
             </div>
          </div>
          <PremiumButton style={{ width: '100%', justifyContent: 'center' }} onClick={() => { logout(); navigate('/'); }}>
            <LogOut size={18} /> Secure Logout
          </PremiumButton>
        </div>
      </Sidebar>

      <MainContent>
        <Header>
          <PageTitle>{tabTitles[activeTab]}</PageTitle>
          <QuickActions>
            <PremiumButton onClick={() => window.open('/', '_blank')}>
              <ExternalLink size={18} /> View Storefront
            </PremiumButton>
            <PremiumButton $primary onClick={() => setActiveTab('add')}>
              <Plus size={18} /> New Product
            </PremiumButton>
          </QuickActions>
        </Header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <MetricsGrid>
                <MetricCard>
                  <MetricHeader>Gross Revenue <TrendingUp size={18} color="#d4af37" /></MetricHeader>
                  <MetricValue>₹{data.totalRevenue.toLocaleString()} <span><ArrowUpRight size={14} /> 12.5%</span></MetricValue>
                </MetricCard>
                <MetricCard>
                  <MetricHeader>Total Orders <ShoppingCart size={18} color="#d4af37" /></MetricHeader>
                  <MetricValue>{orders.length} <span><ArrowUpRight size={14} /> 8.1%</span></MetricValue>
                </MetricCard>
                <MetricCard>
                  <MetricHeader>Active Inventory <PackageSearch size={18} color="#d4af37" /></MetricHeader>
                  <MetricValue>{products.length} <span>Stable</span></MetricValue>
                </MetricCard>
              </MetricsGrid>

              <DataSection>
                <h3 style={{ marginBottom: '2rem', fontSize: '1.2rem', color: '#fff' }}>Revenue Analytics</h3>
                <div style={{ height: '350px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <XAxis dataKey="name" stroke="#666" tick={{ fill: '#888' }} axisLine={false} tickLine={false} />
                      <YAxis stroke="#666" tick={{ fill: '#888' }} axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                      <Tooltip 
                        cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                        contentStyle={{ backgroundColor: 'rgba(20,20,22,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)', color: '#fff' }} 
                        itemStyle={{ color: '#d4af37', fontWeight: 'bold' }}
                      />
                      <Bar dataKey="revenue" fill="url(#goldGradient)" radius={[6, 6, 0, 0]} barSize={40} />
                      <defs>
                        <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#d4af37" />
                          <stop offset="100%" stopColor="#8a6e1c" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </DataSection>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div key="orders" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <DataSection>
                <div style={{ padding: '0 0.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ color: '#fff' }}>Recent Transactions</h3>
                  <input type="text" placeholder="Search orders..." style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.6rem 1rem', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }} />
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <Table>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer / Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(o => (
                        <tr key={o.id}>
                          <td style={{ fontWeight: '600', color: '#d4af37' }}>{o.id}</td>
                          <td>
                            <div style={{ color: '#fff', fontWeight: 500, marginBottom: '0.2rem' }}>{o.address?.name || o.customer || 'Guest User'}</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>{o.date}</div>
                          </td>
                          <td style={{ fontWeight: '600', color: '#fff' }}>₹{o.total?.toLocaleString() || '0'}</td>
                          <td><StatusPill $status={o.status || 'Pending'}>{o.status || 'Pending'}</StatusPill></td>
                          <td style={{ textAlign: 'right' }}>
                            <PremiumButton style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', display: 'inline-flex' }}>Update</PremiumButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </DataSection>
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div key="products" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <DataSection>
                <div style={{ overflowX: 'auto' }}>
                  <Table>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock Level</th>
                        <th style={{ textAlign: 'right' }}>Manage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <img src={p.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                              <span style={{ color: '#fff', fontWeight: 500 }}>{p.name}</span>
                            </div>
                          </td>
                          <td><span style={{ background: 'rgba(255,255,255,0.05)', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', color: '#aaa', textTransform: 'uppercase' }}>{p.category}</span></td>
                          <td style={{ color: '#fff', fontWeight: 500 }}>₹{p.price?.toLocaleString()}</td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.stock > 10 ? '#4ade80' : '#f87171' }} />
                              <span style={{ color: p.stock > 10 ? '#ccc' : '#f87171', fontWeight: p.stock <= 10 ? 'bold' : 'normal' }}>{p.stock} Units</span>
                            </div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                              <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}><Edit size={16} /></button>
                              <button style={{ background: 'rgba(248,113,113,0.1)', border: 'none', color: '#f87171', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer' }}><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </DataSection>
            </motion.div>
          )}

          {activeTab === 'add' && (
            <motion.div key="add" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <DataSection>
                <FormGrid onSubmit={(e) => { e.preventDefault(); alert('Item securely published to storefront.'); }}>
                  <InputGroup>
                    <label>Master Item Name</label>
                    <input type="text" placeholder="e.g. Royal Bemberg Silk Anarkali" required />
                  </InputGroup>
                  <InputGroup>
                    <label>Collection ID</label>
                    <select required>
                      <option value="festive">Festive '26 Collection</option>
                      <option value="exclusive">Signature Exclusive</option>
                      <option value="bridals">Bridal Heritage</option>
                      <option value="casuals">Luxury Casuals</option>
                    </select>
                  </InputGroup>
                  <InputGroup>
                    <label>Price Configuration (₹)</label>
                    <input type="number" placeholder="45000" required />
                  </InputGroup>
                  <InputGroup>
                    <label>Initial Warehouse Stock</label>
                    <input type="number" placeholder="25" required />
                  </InputGroup>
                  <InputGroup style={{ gridColumn: 'span 2' }}>
                    <label>High-Res Media URL</label>
                    <input type="text" placeholder="https://cdn.annmaria.com/catalog/img-1.jpg" required />
                  </InputGroup>
                  <InputGroup style={{ gridColumn: 'span 2' }}>
                    <label>Rich Product Description & Care</label>
                    <textarea placeholder="Describe the intricate details, fabric feel, and washing instructions..." required />
                  </InputGroup>
                  <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <PremiumButton $primary type="submit">
                      <Plus size={18} /> Publish New Artifact
                    </PremiumButton>
                  </div>
                </FormGrid>
              </DataSection>
            </motion.div>
          )}

        </AnimatePresence>
      </MainContent>
    </AdminWrapper>
  );
};

export default Dashboard;
