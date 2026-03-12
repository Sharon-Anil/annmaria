import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Scissors, Ruler, CheckCircle, MessageCircle, Camera } from 'lucide-react';

const Container = styled.div`
  padding: 4rem 5%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const Title = styled.h1`
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: var(--accent-gold);
  margin-bottom: 1.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--glass-border);
  padding: 2.5rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const IconWrap = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(255, 45, 107, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-gold);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
`;

const Input = styled.input`
  background: var(--bg-tertiary);
  border: 1px solid var(--glass-border);
  padding: 1rem;
  border-radius: 8px;
  color: var(--text-primary);
  outline: none;
  &:focus { border-color: var(--accent-gold); }
`;

const TextArea = styled.textarea`
  background: var(--bg-tertiary);
  border: 1px solid var(--glass-border);
  padding: 1rem;
  border-radius: 8px;
  color: var(--text-primary);
  min-height: 120px;
  outline: none;
  &:focus { border-color: var(--accent-gold); }
`;

const SubmitBtn = styled.button`
  background: var(--accent-gold);
  color: #000;
  border: none;
  padding: 1.2rem;
  border-radius: 8px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover { background: var(--accent-gold-hover); transform: translateY(-3px); }
`;

const SuccessMsg = styled(motion.div)`
  text-align: center;
  padding: 4rem;
  background: var(--bg-secondary);
  border-radius: 20px;
  border: 1px solid var(--accent-gold);
`;



const Select = styled.select`
  background: var(--bg-tertiary);
  border: 1px solid var(--glass-border);
  padding: 1rem;
  border-radius: 8px;
  color: var(--text-primary);
  outline: none;
  font-family: var(--font-sans);
  &:focus { border-color: var(--accent-gold); }
`;

const FileInput = styled.div`
  border: 2px dashed var(--glass-border);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover { border-color: var(--accent-gold); background: rgba(255, 45, 107, 0.05); }
  
  input { display: none; }
`;

const Stitching: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    material: 'Cotton',
    color: '#000000',
    size: 'M',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp Message
    const text = `*New Stitching Inquiry - Ann Maria Boutique*%0A%0A` +
                 `*Name:* ${formData.name}%0A` +
                 `*Service:* ${formData.service}%0A` +
                 `*Material:* ${formData.material}%0A` +
                 `*Color:* ${formData.color}%0A` +
                 `*Size:* ${formData.size}%0A` +
                 `*Notes:* ${formData.notes}%0A%0A` +
                 `Please contact me at ${formData.phone}`;
    
    const waUrl = `https://wa.me/918075575472?text=${text}`; // Using the boutique number from earlier conversations if available, or a placeholder
    
    window.open(waUrl, '_blank');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Container>
        <SuccessMsg
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <CheckCircle size={80} color="var(--accent-gold)" style={{ marginBottom: '2rem' }} />
          <Title>Request Sent!</Title>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Your inquiry has been sent via WhatsApp. Our master tailor will also 
            be notified and contact you shortly.
          </p>
          <SubmitBtn onClick={() => setSubmitted(false)}>
            Back to Home
          </SubmitBtn>
        </SuccessMsg>
      </Container>
    );
  }

  return (
    <Container>
      <Hero>
        <Title>Custom Stitching</Title>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
          Precision tailoring with advanced customization options.
        </p>
      </Hero>

      <FormGrid>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <StepCard>
            <IconWrap><Scissors size={30} /></IconWrap>
            <h3>Master Tailoring</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Handcrafted perfection for your unique silhouette.
            </p>
          </StepCard>
          
          <StepCard style={{ marginTop: '2rem' }}>
            <IconWrap><MessageCircle size={30} /></IconWrap>
            <h3>Direct WhatsApp Support</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Send your design inspirations and chat directly with our design team.
            </p>
          </StepCard>

          <div style={{ marginTop: '3rem' }}>
            <h3>Upload Inspirations</h3>
            <FileInput onClick={() => document.getElementById('photo-upload')?.click()}>
              <Camera size={40} color="var(--accent-gold)" style={{ marginBottom: '1rem' }} />
              <p style={{ color: 'var(--text-secondary)' }}>Click to upload reference photos</p>
              <input type="file" id="photo-upload" accept="image/*" />
            </FileInput>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <StepCard>
            <h3>Advanced Selection</h3>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Full Name</Label>
                <Input name="name" type="text" placeholder="Enter your name" onChange={handleChange} required />
              </FormGroup>
              <FormGroup>
                <Label>Phone Number</Label>
                <Input name="phone" type="tel" placeholder="Enter your mobile number" onChange={handleChange} required />
              </FormGroup>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormGroup>
                  <Label>Service Type</Label>
                  <Select name="service" onChange={handleChange} required>
                    <option value="">Select Service</option>
                    <option value="Blouse">Blouse Stitching</option>
                    <option value="Salwar">Salwar Suit</option>
                    <option value="Lehenga">Lehenga</option>
                    <option value="Alteration">Alteration</option>
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label>Size Preference</Label>
                  <Select name="size" onChange={handleChange}>
                    <option value="S">Small (S)</option>
                    <option value="M">Medium (M)</option>
                    <option value="L">Large (L)</option>
                    <option value="XL">Extra Large (XL)</option>
                    <option value="Custom">Custom Measurements</option>
                  </Select>
                </FormGroup>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormGroup>
                  <Label>Cloth Material</Label>
                  <Select name="material" onChange={handleChange}>
                    <option value="Silk">Silk</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Georgette">Georgette</option>
                    <option value="Chiffon">Chiffon</option>
                    <option value="Velvet">Velvet</option>
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label>Desired Color</Label>
                  <Input name="color" type="color" onChange={handleChange} style={{ height: '45px', padding: '5px' }} />
                </FormGroup>
              </div>

              <FormGroup>
                <Label>Detailed Requirements</Label>
                <TextArea name="notes" placeholder="Describe neck patterns, sleeve styles, etc..." onChange={handleChange} required />
              </FormGroup>
              
              <SubmitBtn type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <MessageCircle size={20} /> Send via WhatsApp
              </SubmitBtn>
            </Form>
          </StepCard>
        </motion.div>
      </FormGrid>
    </Container>
  );
};

export default Stitching;
