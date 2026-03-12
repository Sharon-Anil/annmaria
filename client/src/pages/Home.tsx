import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

/* ── Images ─────────────────────────────────────────────────────── */
const SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1621112904887-419379ce6824?auto=format&fit=crop&q=90&w=1600',
    tag: 'New Arrivals',
    title: 'Ann Maria',
    sub: 'Boutique',
    desc: 'Curated ethnic wear for the modern Indian woman.',
    pos: 'center 40%',
  },
  {
    img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=90&w=1600',
    tag: 'Bridal Edit',
    title: 'Bridal',
    sub: 'Collection',
    desc: 'Handcrafted sarees and lehengas for your special day.',
    pos: 'center 20%',
  },
  {
    img: '/images/festival_specials.png',
    tag: 'Festival Sale — Up to 40% Off',
    title: 'Festival',
    sub: 'Edition',
    desc: 'Celebrate every occasion in timeless style.',
    pos: 'center 30%',
  },
  {
    img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=90&w=1600',
    tag: 'Exclusive Kurtis',
    title: 'Designer',
    sub: 'Kurtis',
    desc: 'Elegant everyday kurtis crafted for comfort and style.',
    pos: 'center 25%',
  },
  {
    img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=90&w=1600',
    tag: 'Traditional Wear',
    title: 'Timeless',
    sub: 'Elegance',
    desc: 'Traditional silhouettes reimagined for the modern wardrobe.',
    pos: 'center 45%',
  },
];

// Separate portrait images for the floating side cards
const SIDE_IMAGES = [
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=500&h=800',
  '/images/festive_red_anarkali.png',
  '/images/festival_specials.png',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=500&h=800',
  'https://images.unsplash.com/photo-1515347619152-c6bbf8535a29?auto=format&fit=crop&q=80&w=500&h=800',
];

/* ── Keyframes ──────────────────────────────────────────────────── */
const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255,45,107,0.3); }
  50%       { box-shadow: 0 0 40px rgba(255,45,107,0.7); }
`;

const scanline = keyframes`
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(400%); }
`;

const ticker = keyframes`
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const marqueeText = 'ANN MARIA BOUTIQUE  ·  NEW COLLECTION 2025  ·  ETHNIC COUTURE  ·  FREE SHIPPING  ·  ';

/* ── Ticker ─────────────────────────────────────────────────────── */
const TickerWrap = styled.div`
  background: var(--accent-gold);
  color: #0A0A0A;
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  overflow: hidden;
  white-space: nowrap;
  padding: 0.55rem 0;
  position: relative;
  z-index: 5;
`;

const TickerInner = styled.div`
  display: inline-block;
  animation: ${ticker} 18s linear infinite;
`;

/* ── Hero ───────────────────────────────────────────────────────── */
const HeroWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  background: #0A0A0A;
`;

const Slide = styled(motion.div) <{ $img: string; $pos?: string }>`
  position: absolute;
  inset: 0;
  background: url(${p => p.$img}) ${p => p.$pos || 'center center'} / cover no-repeat;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    110deg,
    rgba(10,10,10,0.95) 0%,
    rgba(10,10,10,0.75) 40%,
    rgba(10,10,10,0.25) 75%,
    transparent 100%
  );
  z-index: 1;
`;

/* Scanline effect */
const ScanLine = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  overflow: hidden;
  pointer-events: none;
  &::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255,45,107,0.2), transparent);
    animation: ${scanline} 4s linear infinite;
  }
`;

const HeroBody = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  padding: 0 7%;
`;

const HeroLeft = styled.div`
  max-width: 620px;
`;

const TagPill = styled(motion.span)`
  display: inline-block;
  background: rgba(255,45,107,0.12);
  border: 1px solid rgba(255,45,107,0.5);
  color: var(--accent-gold);
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 0.4rem 1.2rem;
  border-radius: 999px;
  margin-bottom: 1.8rem;
  animation: ${glowPulse} 3s ease-in-out infinite;
`;

const HeroTitle = styled(motion.h1)`
  font-family: var(--font-serif);
  font-size: clamp(4rem, 7vw, 8rem);
  font-weight: 700;
  color: #fff;
  line-height: 0.9;
  margin: 0;
  letter-spacing: -3px;
`;

const HeroTitleAccent = styled.span`
  display: block;
  color: var(--accent-gold);
  font-style: italic;
  font-weight: 400;
  font-size: 0.65em;
  letter-spacing: -1px;
`;

const Divider = styled(motion.div)`
  width: 3rem;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-gold), transparent);
  margin: 2rem 0;
  border-radius: 99px;
`;

const HeroDesc = styled(motion.p)`
  font-family: var(--font-sans);
  font-size: 1rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.8;
  margin: 0 0 2.5rem 0;
  max-width: 400px;
`;

const CTARow = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PrimaryBtn = styled(Link)`
  background: var(--accent-gold);
  color: #0A0A0A;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  padding: 1rem 2.5rem;
  border-radius: 4px;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  &:hover {
    background: var(--accent-gold-hover);
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(255,45,107,0.4);
  }
`;

const GhostBtn = styled(Link)`
  background: transparent;
  color: #fff;
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.8rem;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  padding: 1rem 2.5rem;
  border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.2);
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  &:hover {
    border-color: var(--accent-gold);
    color: var(--accent-gold);
  }
`;

/* Right side image cards */
const HeroRight = styled.div`
  position: absolute;
  right: 4%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 1.2rem;
  height: 65vh;
  z-index: 3;
  align-items: center;

  @media (max-width: 900px) { display: none; }
`;

const CardFrame = styled(motion.div) <{ $img: string }>`
  width: 220px;
  height: 100%;
  border-radius: 14px;
  background: url(${p => p.$img}) center 15% / cover no-repeat;
  border: 1px solid rgba(255,45,107,0.25);
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.9) 100%);
  }
`;

/* Progress bar */
const ProgressBar = styled.div`
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 2px;
  background: rgba(255,255,255,0.1);
  z-index: 4;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: var(--accent-gold);
  transform-origin: left;
`;

/* Dots */
const DotRow = styled.div`
  position: absolute;
  bottom: 2.2rem;
  left: 7%;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: ${p => p.$active ? '2rem' : '0.45rem'};
  height: 0.45rem;
  border-radius: 99px;
  background: ${p => p.$active ? 'var(--accent-gold)' : 'rgba(255,255,255,0.25)'};
  border: none;
  cursor: pointer;
  transition: all 0.4s ease;
  padding: 0;
`;

/* ── Category Grid ───────────────────────────────────────────────── */
const Section = styled.section<{ $dark?: boolean }>`
  background: ${p => p.$dark ? 'var(--bg-secondary)' : 'var(--bg-primary)'};
  padding: 5rem 7%;
`;

const SectionHead = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 3rem;
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

const ViewLink = styled(Link)`
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-secondary);
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 2px;
  transition: all 0.3s ease;
  &:hover { color: var(--accent-gold); border-color: var(--accent-gold); }
`;

const Grid4 = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const CatCard = styled(motion.div) <{ $img: string; $tall?: boolean }>`
  position: relative;
  height: ${p => p.$tall ? '420px' : '340px'};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: url(${p => p.$img}) center / cover no-repeat;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 30%, rgba(10,10,10,0.95) 100%);
    z-index: 1;
    transition: opacity 0.4s ease;
  }
  &:hover::before { opacity: 0.7; }

  /* Border glow on hover */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    border: 1px solid transparent;
    transition: border-color 0.3s ease;
  }
  &:hover::after { border-color: rgba(255,45,107,0.4); }
`;

const CatInfo = styled.div`
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 2;
  padding: 1.5rem;
`;

const CatTitle = styled.h3`
  font-family: var(--font-serif);
  font-size: 1.5rem;
  color: #fff;
  margin: 0 0 0.3rem 0;
`;

const CatSub = styled.p`
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--accent-gold);
  margin: 0;
`;

const ExploreTag = styled.span`
  display: inline-block;
  margin-top: 0.8rem;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
`;

/* ── Promo Banner ────────────────────────────────────────────────── */
const PromoPair = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 1rem;
  @media (max-width: 700px) { grid-template-columns: 1fr; }
`;

const PromoBanner = styled(motion.div) <{ $img: string }>`
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  background: url(${p => p.$img}) center / cover no-repeat;
  display: flex;
  align-items: flex-end;
  min-height: 380px;
  border: 1px solid var(--glass-border);
`;

const PromoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 60%, transparent 100%);
`;

const PromoBody = styled.div`
  position: relative;
  z-index: 1;
  padding: 2.5rem;
`;

const PromoTag = styled.p`
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent-gold);
  margin: 0 0 0.6rem 0;
`;

const PromoTitle = styled.h3`
  font-family: var(--font-serif);
  font-size: 2.2rem;
  color: #fff;
  margin: 0 0 1.5rem 0;
  line-height: 1.1;
`;

const PromoBtn = styled(Link)`
  background: var(--accent-gold);
  color: #0A0A0A;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  &:hover { background: var(--accent-gold-hover); transform: translateY(-2px); }
`;

/* ── Stats Strip ────────────────────────────────────────────────── */
const StatsStrip = styled.div`
  background: var(--bg-tertiary);
  border-top: 1px solid var(--glass-border);
  border-bottom: 1px solid var(--glass-border);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 600px) { grid-template-columns: repeat(2, 1fr); }
`;

const StatItem = styled.div`
  padding: 2rem;
  text-align: center;
  border-right: 1px solid var(--glass-border);
  &:last-child { border-right: none; }
`;

const StatNum = styled.div`
  font-family: var(--font-serif);
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--accent-gold);
  margin-bottom: 0.3rem;
`;

const StatLabel = styled.div`
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-secondary);
`;

/* ── Testimonials ───────────────────────────────────────────────── */
const TestimGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  @media (max-width: 700px) { grid-template-columns: 1fr; }
`;

const TestimCard = styled(motion.div)`
  background: var(--bg-tertiary);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '"';
    position: absolute;
    top: -1rem;
    left: 1.5rem;
    font-family: var(--font-serif);
    font-size: 8rem;
    color: rgba(255,45,107,0.08);
    line-height: 1;
    pointer-events: none;
  }
`;

const Stars = styled.div`
  color: var(--accent-gold);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  letter-spacing: 2px;
`;

const TestimText = styled.p`
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0 0 1.5rem 0;
`;

const TestimAuthor = styled.div`
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  span {
    display: block;
    font-weight: 400;
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-top: 0.2rem;
  }
`;


/* ── Component ──────────────────────────────────────────────────── */
const Home: React.FC = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(prev => (prev + 1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const categories = [
    { title: 'Sarees', sub: 'Silk & Kanjivaram', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600', tall: true },
    { title: 'Anarkali', sub: 'Festive Wear', img: '/images/festive_red_anarkali.png', tall: false },
    { title: 'Lehenga', sub: 'Bridal & Party', img: '/images/traditional_bridal_lehenga.png', tall: false },
    { title: 'Kurti', sub: 'Daily Casual', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600', tall: true },
  ];

  return (
    <>
      {/* Ticker */}
      <TickerWrap>
        <TickerInner>
          {marqueeText.repeat(6)}
        </TickerInner>
      </TickerWrap>

      {/* ── Hero ── */}
      <HeroWrap>
        <AnimatePresence mode="wait">
          <Slide
            key={idx}
            $img={SLIDES[idx].img}
            $pos={SLIDES[idx].pos}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
          />
        </AnimatePresence>

        <Overlay />
        <ScanLine />

        <HeroBody>
          <HeroLeft>
            <AnimatePresence mode="wait">
              <motion.div key={`tag-${idx}`}>
                <TagPill
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {SLIDES[idx].tag}
                </TagPill>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <HeroTitle
                key={`title-${idx}`}
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7 }}
              >
                {SLIDES[idx].title}
                <HeroTitleAccent>{SLIDES[idx].sub}</HeroTitleAccent>
              </HeroTitle>
            </AnimatePresence>

            <Divider
              initial={{ width: 0 }}
              animate={{ width: '3rem' }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            <AnimatePresence mode="wait">
              <HeroDesc
                key={`desc-${idx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {SLIDES[idx].desc}
              </HeroDesc>
            </AnimatePresence>

            <CTARow
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <PrimaryBtn to="/shop">Shop Now</PrimaryBtn>
              <GhostBtn to="/exclusive">View Collection</GhostBtn>
            </CTARow>
          </HeroLeft>
        </HeroBody>

        {/* Right floating cards */}
        <HeroRight>
          {[0, 1].map(offset => (
            <CardFrame
              key={`card-${idx}-${offset}`}
              $img={SIDE_IMAGES[(idx + offset) % SIDE_IMAGES.length]}
              style={{ marginTop: offset === 0 ? '4rem' : '0' }}
              initial={{ opacity: 0, y: offset === 0 ? 60 : -60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: offset * 0.2 }}
            />
          ))}
        </HeroRight>

        {/* Dots */}
        <DotRow>
          {SLIDES.map((_, i) => (
            <Dot key={i} $active={i === idx} onClick={() => setIdx(i)} />
          ))}
        </DotRow>

        {/* Progress bar */}
        <ProgressBar>
          <ProgressFill
            key={idx}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 4.0, ease: 'linear' }}
          />
        </ProgressBar>
      </HeroWrap>

      {/* ── Stats ── */}
      <StatsStrip>
        {[
          { num: '2K+', label: 'Happy Customers' },
          { num: '500+', label: 'Designs' },
          { num: '4.9★', label: 'Avg Rating' },
          { num: 'Free', label: 'Pan-India Shipping' },
        ].map(s => (
          <StatItem key={s.label}>
            <StatNum>{s.num}</StatNum>
            <StatLabel>{s.label}</StatLabel>
          </StatItem>
        ))}
      </StatsStrip>

      {/* ── Categories ── */}
      <Section>
        <SectionHead>
          <div>
            <SectionLabel>Explore</SectionLabel>
            <SectionTitle>Shop by Category</SectionTitle>
          </div>
          <ViewLink to="/shop">View All →</ViewLink>
        </SectionHead>

        <Grid4>
          {categories.map((c, i) => (
            <Link to="/shop" key={c.title} style={{ textDecoration: 'none' }}>
              <CatCard
                $img={c.img}
                $tall={c.tall}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <CatInfo>
                  <CatTitle>{c.title}</CatTitle>
                  <CatSub>{c.sub}</CatSub>
                  <ExploreTag>Explore →</ExploreTag>
                </CatInfo>
              </CatCard>
            </Link>
          ))}
        </Grid4>
      </Section>

      {/* ── Promo Banners ── */}
      <Section $dark>
        <SectionHead>
          <div>
            <SectionLabel>Curated</SectionLabel>
            <SectionTitle>Featured Collections</SectionTitle>
          </div>
        </SectionHead>
        <PromoPair>
          <PromoBanner
            $img="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=900"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <PromoOverlay />
            <PromoBody>
              <PromoTag>Bridal Edit 2025</PromoTag>
              <PromoTitle>Wedding Season<br />Collection</PromoTitle>
              <PromoBtn to="/exclusive">Explore Bridal</PromoBtn>
            </PromoBody>
          </PromoBanner>

          <PromoBanner
            $img="https://images.unsplash.com/photo-1583391733958-690226cce123?auto=format&fit=crop&q=80&w=700"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <PromoOverlay />
            <PromoBody>
              <PromoTag>Up to 40% Off</PromoTag>
              <PromoTitle>Festival<br />Specials</PromoTitle>
              <PromoBtn to="/shop">Shop Sale</PromoBtn>
            </PromoBody>
          </PromoBanner>
        </PromoPair>
      </Section>

      {/* ── Testimonials ── */}
      <Section>
        <SectionHead>
          <div>
            <SectionLabel>Our Customers</SectionLabel>
            <SectionTitle>What They Say</SectionTitle>
          </div>
        </SectionHead>
        <TestimGrid>
          {[
            { text: 'The saree I ordered was absolutely gorgeous! The fabric quality is exceptional and the delivery was super fast.', name: 'Priya Menon', loc: 'Kerala' },
            { text: 'Got my bridal lehenga from Ann Maria Boutique and I could not have been happier. Stunning craftsmanship!', name: 'Anjali Singh', loc: 'Delhi' },
            { text: 'Love the Anarkali I bought for Onam. The colours are vibrant and exactly as shown. Will definitely order again!', name: 'Meera Nair', loc: 'Kochi' },
          ].map((t, i) => (
            <TestimCard
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Stars>★★★★★</Stars>
              <TestimText>{t.text}</TestimText>
              <TestimAuthor>
                {t.name}
                <span>{t.loc}</span>
              </TestimAuthor>
            </TestimCard>
          ))}
        </TestimGrid>
      </Section>


    </>
  );
};

export default Home;
