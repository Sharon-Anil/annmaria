import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import styled from 'styled-components';
import WhatsAppWidget from '../common/WhatsAppWidget';

const MainContainer = styled.main`
  min-height: calc(100vh - 160px); /* Adjust based on navbar/footer height */
  padding-top: 80px; /* Space for fixed navbar */
`;

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <WhatsAppWidget />
      <Footer />
    </>
  );
};

export default Layout;
