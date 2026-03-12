import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, Calendar, ArrowRight, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const Container = styled.div`
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: radial-gradient(circle at top right, rgba(212, 175, 55, 0.05), transparent);
`;

const SuccessCard = styled(motion.div)`
  background: var(--bg-secondary);
  padding: 4rem;
  border-radius: 24px;
  border: 1px solid var(--accent-gold);
  text-align: center;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
  position: relative;
  overflow: hidden;
`;

const IconWrapper = styled(motion.div)`
  width: 100px;
  height: 100px;
  background: rgba(76, 175, 80, 0.1);
  color: #4caf50;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 2rem;
`;

const SuccessTitle = styled.h1`
  font-family: var(--font-serif);
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  margin-bottom: 3rem;
`;

const DeliveryInfo = styled(motion.div)`
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;
  text-align: left;
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  
  div h4 {
    color: var(--accent-gold);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.3rem;
  }
  
  div p {
    color: #fff;
    font-weight: 600;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled.button`
  background: var(--accent-gold);
  color: var(--bg-primary);
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #c5a037;
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: #fff;
  border: 1px solid var(--glass-border);
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255,255,255,0.05);
  }
`;

const PaymentSuccess: React.FC = () => {
    const navigate = useNavigate();

    // Calculate delivery date (today + 5-7 days)
    const today = new Date();
    const deliveryStart = new Date(today);
    deliveryStart.setDate(today.getDate() + 5);
    const deliveryEnd = new Date(today);
    deliveryEnd.setDate(today.getDate() + 7);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    };

    useEffect(() => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#ffffff', '#4caf50']
        });
    }, []);

    return (
        <Container>
            <SuccessCard
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, type: 'spring' }}
            >
                <IconWrapper
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                >
                    <CheckCircle size={50} />
                </IconWrapper>

                <SuccessTitle>Order Placed Successfully!</SuccessTitle>
                <Subtitle>Thank you for shopping with Ann Maria. Your order is being processed with love.</Subtitle>

                <DeliveryInfo
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <InfoItem>
                        <Truck size={24} color="#D4AF37" />
                        <div>
                            <h4>Shipping Method</h4>
                            <p>Premium Standard</p>
                        </div>
                    </InfoItem>
                    <InfoItem>
                        <Calendar size={24} color="#D4AF37" />
                        <div>
                            <h4>Estimated Delivery</h4>
                            <p>{formatDate(deliveryStart)} - {formatDate(deliveryEnd)}</p>
                        </div>
                    </InfoItem>
                    <InfoItem style={{ gridColumn: 'span 2' }}>
                        <Package size={24} color="#D4AF37" />
                        <div>
                            <h4>What's Next?</h4>
                            <p>You will receive an SMS confirmation once your order ships.</p>
                        </div>
                    </InfoItem>
                </DeliveryInfo>

                <ButtonGroup>
                    <PrimaryButton onClick={() => navigate('/orders')}>
                        Track My Order <ArrowRight size={18} />
                    </PrimaryButton>
                    <SecondaryButton onClick={() => navigate('/shop')}>
                        <ShoppingBag size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Continue Shopping
                    </SecondaryButton>
                </ButtonGroup>

                {/* Animated Background Element */}
                <motion.div
                    style={{
                        position: 'absolute',
                        bottom: '-50px',
                        right: '-50px',
                        width: '200px',
                        height: '200px',
                        background: 'var(--accent-gold)',
                        borderRadius: '50%',
                        filter: 'blur(80px)',
                        opacity: 0.1,
                        zIndex: -1
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity
                    }}
                />
            </SuccessCard>
        </Container>
    );
};

export default PaymentSuccess;
