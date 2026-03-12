import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #02071f, #091c53);
  position: relative;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
`;

// Background Elements
const Moon = styled.div`
  position: absolute;
  top: 15%;
  left: 20%;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: inset -25px -10px 0 0px #1a3680;
  animation: ${float} 8s ease-in-out infinite;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    box-shadow: inset -15px -6px 0 0px #1a3680;
    top: 10%;
    left: 10%;
  }
`;

const Cloud = styled(motion.div)`
  position: absolute;
  background: #102466;
  border-radius: 50px;
  opacity: 0.8;

  &::before, &::after {
    content: '';
    position: absolute;
    background: #102466;
    border-radius: 50%;
  }
`;

const Cloud1 = styled(Cloud)`
  top: 10%;
  right: 15%;
  width: 150px;
  height: 50px;
  &::before { width: 70px; height: 70px; top: -30px; left: 20px; }
  &::after { width: 50px; height: 50px; top: -20px; left: 70px; }
  
  @media (max-width: 768px) {
    transform: scale(0.6);
    right: 5%;
    top: 5%;
  }
`;

const Cloud2 = styled(Cloud)`
  top: 60%;
  left: 5%;
  width: 200px;
  height: 60px;
  &::before { width: 80px; height: 80px; top: -40px; left: 30px; }
  &::after { width: 60px; height: 60px; top: -25px; left: 100px; }

  @media (max-width: 768px) {
    transform: scale(0.5);
    left: -10%;
    top: 80%;
  }
`;

const Star = styled.div<{ $top: string, $left: string, $size: string, $delay: string }>`
  position: absolute;
  top: ${p => p.$top};
  left: ${p => p.$left};
  width: ${p => p.$size};
  height: ${p => p.$size};
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 ${p => p.$size} #fff;
  animation: glow 2s ease-in-out infinite alternate;
  animation-delay: ${p => p.$delay};

  @keyframes glow {
    from { opacity: 0.3; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1.2); }
  }
`;

const Hill = styled.div<{ $color: string, $bottom: string, $left: string, $right: string, $height: string }>`
  position: absolute;
  bottom: ${p => p.$bottom};
  left: ${p => p.$left};
  right: ${p => p.$right};
  height: ${p => p.$height};
  background: ${p => p.$color};
  border-radius: 100% 100% 0 0;
  z-index: 1;
`;

// Login Card Elements
const LoginCard = styled(motion.div)`
  background: transparent;
  width: 90%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  padding: 2rem;

  @media (max-width: 480px) {
    padding: 1rem;
    width: 95%;
  }
`;

const AvatarCircle = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: radial-gradient(circle, #2563eb, #1e40af);
  border: 4px solid #1e3a8a;
  box-shadow: 0 0 30px rgba(37, 99, 235, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  position: relative;
  overflow: hidden;

  img {
    width: 90%;
    height: auto;
    object-fit: contain;
    margin-top: 10px;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
    margin-bottom: 15px;
  }
`;

const Title = styled.h1`
  color: #fff;
  font-size: 2.2rem;
  letter-spacing: 2px;
  font-weight: 800;
  margin-bottom: 5px;
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  color: #93c5fd;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 30px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  background: #fff;
  border: none;
  padding: 16px 20px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e3a8a;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  &::placeholder {
    color: #94a3b8;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 1px;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 0.85rem;
  }
`;

const FormOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #cbd5e1;
  font-size: 0.8rem;
  cursor: pointer;

  input {
    appearance: none;
    width: 18px;
    height: 18px;
    background: transparent;
    border: 2px solid #cbd5e1;
    border-radius: 50%;
    display: grid;
    place-content: center;
    cursor: pointer;

    &:checked::before {
      content: '✔';
      font-size: 10px;
      color: #fff;
    }
    
    &:checked {
      background: #3b82f6;
      border-color: #3b82f6;
    }
  }
`;

const ForgotLink = styled.a`
  color: #cbd5e1;
  font-size: 0.8rem;
  text-decoration: none;
  &:hover { color: #fff; text-decoration: underline; }
`;

const SubmitButton = styled(motion.button)`
  width: 140px;
  margin: 0 auto;
  border: 1px solid #fff;
  background: transparent;
  color: #fff;
  padding: 12px 0;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #fff;
    color: #02071f;
  }

  @media (max-width: 480px) {
    width: 200px;
    padding: 14px 0;
    font-size: 0.9rem;
  }
`;

const ErrorMsg = styled.p`
  color: #f87171;
  font-size: 0.85rem;
  text-align: center;
  margin-top: -10px;
  margin-bottom: 10px;
`;

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'annmaria' && password === 'user@123') {
      login({
        name: 'Ann Maria',
        email: 'annmaria',
        avatar: '/admin_avatar.png'
      });
      navigate('/admin');
    } else {
      setError('Invalid admin credentials.');
    }
  };

  return (
    <Container>
      {/* Scenic Background */}
      <Moon />
      <Cloud1 animate={{ x: [0, -30, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} />
      <Cloud2 animate={{ x: [0, 50, 0] }} transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }} />
      
      <Star $top="15%" $left="60%" $size="4px" $delay="0s" />
      <Star $top="25%" $left="10%" $size="3px" $delay="1s" />
      <Star $top="40%" $left="80%" $size="5px" $delay="0.5s" />
      <Star $top="60%" $left="25%" $size="2px" $delay="1.5s" />
      <Star $top="10%" $left="85%" $size="4px" $delay="0.2s" />
      <Star $top="75%" $left="75%" $size="3px" $delay="0.8s" />

      <Hill $color="#061340" $bottom="-100px" $left="-10%" $right="-10%" $height="35%" />
      <Hill $color="#0a1a52" $bottom="-50px" $left="-30%" $right="50%" $height="25%" />
      <Hill $color="#0d246b" $bottom="-80px" $left="40%" $right="-20%" $height="30%" />

      <LoginCard initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
        <AvatarCircle>
          {/* Default female avatar illustration similar to the prompt image */}
          <img src="/admin_avatar.png" alt="Admin Avatar" />
        </AvatarCircle>

        <Title>LOGIN</Title>
        <Subtitle>Annmaria Boutique Admin Section</Subtitle>

        {error && <ErrorMsg>{error}</ErrorMsg>}

        <Form onSubmit={handleAdminLogin}>
          <InputGroup>
            <Input 
              type="text" 
              placeholder="USER NAME" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </InputGroup>
          <InputGroup>
            <Input 
              type="password" 
              placeholder="PASSWORD" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </InputGroup>

          <FormOptions>
            <CheckboxLabel>
              <input type="checkbox" /> Remember me
            </CheckboxLabel>
            <ForgotLink href="#">Forgot password?</ForgotLink>
          </FormOptions>

          <SubmitButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit">
            LOGIN
          </SubmitButton>
        </Form>
      </LoginCard>
    </Container>
  );
};

export default AdminLogin;
