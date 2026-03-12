import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  padding: 80px 5%;
  position: relative;
  overflow: hidden;
`;

const BackgroundMedia = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=90&w=2000') center/cover no-repeat;
  filter: brightness(0.3) saturate(1.2);
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: radial-gradient(circle at center, transparent 0%, rgba(10,10,10,0.8) 100%),
              linear-gradient(to bottom, rgba(10,10,10,0.4), rgba(10,10,10,1));
`;

const AuthCard = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  background: rgba(20, 20, 20, 0.4);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0 50px 100px rgba(0, 0, 0, 0.6);
  z-index: 2;
`;


const FormSide = styled.div`
  flex: 1;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  font-family: var(--font-serif);
  font-size: 3rem;
  color: #fff;
  margin-bottom: 10px;
  letter-spacing: -1px;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  margin-bottom: 40px;
  font-size: 1rem;
  letter-spacing: 0.5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent-gold);
  text-transform: uppercase;
  letter-spacing: 2px;
  padding-left: 5px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 20px;
  color: #666;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 18px 18px 18px 55px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:focus {
    outline: none;
    border-color: var(--accent-gold);
    background: rgba(255, 255, 255, 0.07);
    box-shadow: 0 0 25px rgba(212, 175, 55, 0.2);
    transform: scale(1.01);
  }
`;

const AuthButton = styled(motion.button)`
  margin-top: 20px;
  padding: 20px;
  background: var(--accent-gold);
  color: #000;
  border: none;
  border-radius: 15px;
  font-weight: 800;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
`;

const SwitchText = styled.p`
  text-align: center;
  margin-top: 40px;
  font-size: 0.95rem;
  color: var(--text-secondary);

  a {
    color: var(--accent-gold);
    text-decoration: none;
    font-weight: 700;
    margin-left: 8px;
    &:hover { border-bottom: 2px solid var(--accent-gold); }
  }
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'annmaria' && password === 'user@123') {
      login({ 
        name: 'ADMIN', 
        email: 'annmaria',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
      });
      // Direct go to the homepage for the admin section
      navigate('/admin');
    } else {
      login({ 
        name: email.split('@')[0].toUpperCase(), 
        email: email,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
      });
      navigate('/');
    }
  };

  return (
    <AuthContainer>
      <BackgroundMedia 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 0.5, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <BackgroundOverlay />

      <AuthCard
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", damping: 15 }}
      >

        <FormSide>
          <Title>Elegance Awaits</Title>
          <Subtitle>Welcome back to Ann Maria Boutique.</Subtitle>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>Email / Username</Label>
              <InputWrapper>
                <IconWrapper><Mail size={20} /></IconWrapper>
                <Input type="text" placeholder="name@luxury.com or username" value={email} onChange={(e)=>setEmail(e.target.value)} required />
              </InputWrapper>
            </InputGroup>

            <InputGroup>
              <Label>Password</Label>
              <InputWrapper>
                <IconWrapper><Lock size={20} /></IconWrapper>
                <Input type="password" placeholder="••••••••" value={password} onChange={(e)=>setPassword(e.target.value)} required />
              </InputWrapper>
            </InputGroup>

            <AuthButton whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit">
              Sign In <ArrowRight size={20} />
            </AuthButton>
          </Form>

          <SwitchText>
            New to Ann Maria? <Link to="/signup">Become a Member</Link>
          </SwitchText>
        </FormSide>
      </AuthCard>
    </AuthContainer>
  );
};

export default Login;
