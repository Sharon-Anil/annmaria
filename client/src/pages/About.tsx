import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutSection = styled.section`
  padding: 100px 7%;
  background: var(--bg-primary);
  display: flex;
  flex-direction: column;
  gap: 60px;
  position: relative;
  overflow: hidden;
`;

const AboutFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
  position: relative;
  z-index: 1;
  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 80px;
  }
`;

const AboutContent = styled(motion.div)`
  flex: 1;
  max-width: 600px;
`;

const AboutImage = styled(motion.img)`
  width: 100%;
  max-width: 500px;
  border-radius: 40px;
  filter: drop-shadow(0 20px 60px rgba(0,0,0,0.3));
  border: 4px solid rgba(255,255,255,0.05);
  object-fit: cover;
  aspect-ratio: 4/5;
`;

const BounceCircle = styled(motion.div)`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: var(--accent-gold);
  opacity: 0.08;
  z-index: 0;
  filter: blur(100px);
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 40px;
`;

const ContactItem = styled(motion.div)`
  background: var(--bg-tertiary);
  padding: 30px;
  border-radius: 20px;
  border: 1px solid var(--glass-border);
  display: flex;
  flex-direction: column;
  gap: 12px;
  h4 { color: var(--accent-gold); margin: 0; font-family: var(--font-serif); font-size: 1.4rem; }
  p { margin: 0; opacity: 0.7; font-size: 0.9rem; line-height: 1.6; }
  a { color: var(--text-primary); text-decoration: none; font-weight: 600; font-size: 1.1rem; }
`;

const MapWrapper = styled(motion.div)`
  width: 100%;
  height: 450px;
  border-radius: 25px;
  overflow: hidden;
  margin-top: 40px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
  border: 1px solid var(--glass-border);
`;

const SectionLabel = styled.p`
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--accent-gold);
  margin: 0 0 0.5rem 0;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(2rem, 3.5vw, 3rem);
  color: var(--text-primary);
  margin: 0;
  line-height: 1.1;
`;

const About: React.FC = () => {
    return (
        <AboutSection>
            <BounceCircle
                animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                style={{ top: '10%', right: '-5%' }}
            />
            <AboutFlex>
                <AboutContent
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", damping: 15 }}
                >
                    <SectionLabel>Our Story</SectionLabel>
                    <SectionTitle>Ann Maria Boutique</SectionTitle>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8', opacity: 0.8, marginTop: '20px' }}>
                        We bring the finest selection of ethnic wear, combining traditional Indian heritage
                        with modern high-fashion trends. Our boutique in Kayamkulam is dedicated to
                        making every woman feel like royalty. From hand-woven silk sarees to designer
                        wedding lehengas, we celebrate the essence of beauty in every stitch.
                    </p>
                    <ContactGrid>
                        <ContactItem
                            whileHover={{ y: -10, scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h4>Visit Us</h4>
                            <p>5GF2+XXG, SH 6, Kayamkulam<br />Kerala 690502</p>
                        </ContactItem>
                        <ContactItem
                            whileHover={{ y: -10, scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h4>Call & WhatsApp</h4>
                            <a href="tel:8075575472">+91 80755 75472</a>
                            <a href="tel:04792446480">+91 479 2446480</a>
                        </ContactItem>
                    </ContactGrid>
                </AboutContent>

                <AboutImage
                    src="/images/boutique_about_us.png"
                    alt="About Ann Maria Boutique"
                    initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                    whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", damping: 10, stiffness: 100 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                />
            </AboutFlex>

            <MapWrapper
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15764.1232858172!2d76.4913214!3d9.1724217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b060c50ce7e3e9d%3A0xc3f83c1620cfa3ea!2sKayamkulam%2C%20Kerala%20690502!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </MapWrapper>
        </AboutSection>
    );
};

export default About;
