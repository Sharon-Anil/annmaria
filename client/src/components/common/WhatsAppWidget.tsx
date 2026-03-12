import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

const WidgetContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
`;

const WhatsAppButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #25D366;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
  position: relative;
  
  &:hover {
    background: #128C7E;
  }
`;

const NotificationBadge = styled(motion.div)`
  position: absolute;
  top: -2px;
  right: -2px;
  width: 15px;
  height: 15px;
  background: #FF3B30;
  border-radius: 50%;
  border: 2px solid white;
`;

const PopUp = styled(motion.div)`
  width: 300px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0,0,0,0.05);
`;

const PopUpHeader = styled.div`
  background: #075E54;
  color: white;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  opacity: 0.7;
  &:hover { opacity: 1; }
`;

const Avatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #128C7E;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border: 1.5px solid rgba(255,255,255,0.3);
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  span:first-child { font-weight: 600; font-size: 0.95rem; }
  span:last-child { font-size: 0.75rem; opacity: 0.8; }
`;

const ChatBody = styled.div`
  padding: 20px;
  background: #E5DDD5;
  height: 150px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Message = styled.div`
  background: white;
  padding: 10px 15px;
  border-radius: 10px 10px 10px 0;
  font-size: 0.85rem;
  max-width: 85%;
  align-self: flex-start;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  color: #333;
`;

const InputArea = styled.div`
  padding: 15px;
  display: flex;
  gap: 10px;
  background: white;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid #ddd;
  font-size: 0.85rem;
  outline: none;
  &:focus { border-color: #25D366; }
`;

const SendBtn = styled.button`
  background: #25D366;
  color: white;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  display: flex;
  items: center;
  justify-content: center;
  cursor: pointer;
  &:hover { background: #128C7E; }
`;

const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSend = () => {
    if (!msg.trim()) return;
    const phone = "8075575472";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setMsg("");
    setIsOpen(false);
  };

  return (
    <WidgetContainer>
      <AnimatePresence>
        {isOpen && (
          <PopUp
            initial={{ opacity: 0, y: 50, scale: 0.3, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.3 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          >
            <PopUpHeader>
              <CloseBtn onClick={() => setIsOpen(false)}><X size={18} /></CloseBtn>
              <Avatar>AM</Avatar>
              <HeaderInfo>
                <span>Ann Maria Support</span>
                <span>Online • Replies in minutes</span>
              </HeaderInfo>
            </PopUpHeader>
            <ChatBody>
              <Message>
                Hi there! 👋 How can we help you today with your outfit selection?
              </Message>
            </ChatBody>
            <InputArea>
              <Input 
                placeholder="Type your message..." 
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <SendBtn onClick={handleSend}><Send size={16} /></SendBtn>
            </InputArea>
          </PopUp>
        )}
      </AnimatePresence>

      <WhatsAppButton
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        animate={!isOpen ? { y: [0, -10, 0] } : {}}
        transition={!isOpen ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : {}}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {!isOpen && (
          <NotificationBadge 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 }}
          />
        )}
      </WhatsAppButton>
    </WidgetContainer>
  );
};

export default WhatsAppWidget;
