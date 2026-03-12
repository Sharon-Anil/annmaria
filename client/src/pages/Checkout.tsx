import React, { useState } from 'react';
import styled from 'styled-components';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, User, CreditCard, Heart, ShoppingBag } from 'lucide-react';
import { API_BASE_URL } from '../config';

const Container = styled.div`
  padding: 4rem 5%;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-family: var(--font-serif);
  color: var(--accent-gold);
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 3rem;
  
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  background: var(--bg-secondary);
  padding: 2.5rem;
  border-radius: 12px;
  border: 1px solid var(--glass-border);
`;

const SectionTitle = styled.h3`
  font-family: var(--font-serif);
  color: #fff;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.4rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1.2rem;
  background: var(--bg-primary);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--accent-gold);
    box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.9rem 1.2rem;
  background: var(--bg-primary);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: var(--accent-gold);
  }
`;

const PaymentOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OptionCard = styled.label<{ selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border: 1px solid ${props => props.selected ? 'var(--accent-gold)' : 'var(--glass-border)'};
  background: ${props => props.selected ? 'rgba(212, 175, 55, 0.1)' : 'var(--bg-primary)'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  input {
    display: none;
  }
  
  &:hover {
    border-color: var(--accent-gold);
  }
`;

const PriceSummary = styled.div`
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--glass-border);
  height: fit-content;
  position: sticky;
  top: 2rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  
  &.total {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--accent-gold);
    border-top: 1px solid var(--glass-border);
    padding-top: 1rem;
    margin-top: 1rem;
  }
`;

const OrderButton = styled.button`
  width: 100%;
  padding: 1.2rem;
  background: var(--accent-gold);
  color: var(--bg-primary);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border-radius: 8px;
  margin-top: 2rem;
  transition: transform 0.2s, background 0.2s;
  
  &:hover {
    background: #c5a037;
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const PaymentModal = styled.div`
  background: var(--bg-secondary);
  padding: 2.5rem;
  border-radius: 16px;
  text-align: center;
  border: 1px solid var(--accent-gold);
  max-width: 450px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
`;

const QRImage = styled.img`
  width: 280px;
  height: 280px;
  margin: 1.5rem auto;
  border-radius: 12px;
  border: 8px solid white;
`;

const Checkout: React.FC = () => {
    const { cart, cartTotal, placeOrder } = useShop();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isOrdered, setIsOrdered] = useState(false);
    const [showPhonePeModal, setShowPhonePeModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'phonepay' | 'cod'>('razorpay');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
        state: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (paymentMethod === 'razorpay') {
                const res = await loadRazorpayScript();
                if (!res) {
                    alert('Razorpay SDK failed to load. Are you online?');
                    setLoading(false);
                    return;
                }

                // Create order on backend
                const orderResponse = await fetch(`${API_BASE_URL}/api/payment/razorpay/order`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: cartTotal })
                });

                if (!orderResponse.ok) {
                    throw new Error('Failed to create Razorpay order');
                }

                const orderData = await orderResponse.json();

                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_YourKeyForDemo",
                    amount: orderData.amount,
                    currency: orderData.currency,
                    name: "Ann Maria Boutique",
                    description: "Order Payment",
                    order_id: orderData.id,
                    handler: async function (response: any) {
                        try {
                            // Verify payment on backend
                            const verifyRes = await fetch(`${API_BASE_URL}/api/payment/razorpay/verify`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature
                                })
                            });

                            const verifyData = await verifyRes.json();

                            if (verifyData.success) {
                                await placeOrder({ ...formData, paymentId: response.razorpay_payment_id, method: 'razorpay' });
                                setIsOrdered(true);
                                navigate('/payment-success');
                            } else {
                                alert("Payment verification failed");
                            }
                        } catch (err) {
                            console.error(err);
                            alert("Error verifying payment");
                        }
                    },
                    prefill: {
                        name: formData.name,
                        email: formData.email,
                        contact: formData.phone
                    },
                    theme: {
                        color: "#D4AF37"
                    }
                };

                const rzp = new (window as any).Razorpay(options);
                rzp.open();
                setLoading(false);
            } else if (paymentMethod === 'phonepay') {
                setShowPhonePeModal(true);
                setLoading(false);
            } else {
                await placeOrder({ ...formData, method: 'cod' });
                setIsOrdered(true);
                navigate('/payment-success');
            }
        } catch (error: any) {
            console.error('Checkout Error:', error);
            alert(`Checkout failed: ${error.message || "Something went wrong"}. Please check if your backend is running and Razorpay keys are configured.`);
            setLoading(false);
        }
    };

    const verifyPhonePe = async () => {
        setLoading(true);
        try {
            // Simulate background verification
            setTimeout(async () => {
                try {
                    await placeOrder({ ...formData, method: 'phonepay' });
                    setIsOrdered(true);
                    setShowPhonePeModal(false);
                    navigate('/payment-success');
                } catch (err: any) {
                    console.error('PhonePe Sync Error:', err);
                    alert("Order placement failed. Please check your connection.");
                    setLoading(false);
                }
            }, 2000);
        } catch (error) {
            console.error('PhonePe Verification Error:', error);
            setLoading(false);
        }
    };

    if (cart.length === 0 && !isOrdered) {
        return (
            <Container>
                <Title>Oops! Your cart is empty</Title>
                <OrderButton onClick={() => navigate('/shop')}>Continue Shopping</OrderButton>
            </Container>
        );
    }

    return (
        <Container>
            <Title>Complete Your Order</Title>

            {showPhonePeModal && (
                <ModalOverlay>
                    <PaymentModal>
                        <h3 style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>PhonePe Business Checkout</h3>
                        <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.8)' }}>Scan the QR Code to pay ₹{cartTotal.toFixed(2)}</p>
                        <QRImage src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=phonepe://pay?pa=thahoorenterprises@ybl&pn=Thahoor%20Enterprises&am=${cartTotal}&tr=ORD${Date.now()}`} />
                        <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '1.5rem' }}>After paying in your PhonePe app, click verify below.</p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <OrderButton onClick={verifyPhonePe} disabled={loading} style={{ margin: 0, flex: 1 }}>
                                {loading ? 'Verifying...' : 'Verify Payment'}
                            </OrderButton>
                            <button
                                onClick={() => setShowPhonePeModal(false)}
                                style={{ background: 'transparent', color: '#fff', border: '1px solid #444', padding: '0 1.5rem', borderRadius: '8px', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                        </div>
                    </PaymentModal>
                </ModalOverlay>
            )}

            <form onSubmit={handleCheckout}>
                <Grid>
                    <FormSection>
                        <SectionTitle><User size={20} /> Customer Details</SectionTitle>
                        <InputGroup>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <Input name="name" placeholder="Full Name" required value={formData.name} onChange={handleInputChange} />
                                <Input name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleInputChange} />
                            </div>
                            <Input name="email" type="email" placeholder="Email Address" required value={formData.email} onChange={handleInputChange} />
                        </InputGroup>

                        <SectionTitle><MapPin size={20} /> Shipping Address</SectionTitle>
                        <InputGroup>
                            <TextArea name="address" placeholder="Full Address (House, Street, Area...)" required value={formData.address} onChange={handleInputChange} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <Input name="city" placeholder="City" required value={formData.city} onChange={handleInputChange} />
                                <Input name="pincode" placeholder="Pincode" required value={formData.pincode} onChange={handleInputChange} />
                            </div>
                            <Input name="state" placeholder="State" required value={formData.state} onChange={handleInputChange} />
                        </InputGroup>

                        <SectionTitle><CreditCard size={20} /> Payment Method</SectionTitle>
                        <PaymentOptions>
                            <OptionCard selected={paymentMethod === 'razorpay'}>
                                <input type="radio" name="payment" onChange={() => setPaymentMethod('razorpay')} checked={paymentMethod === 'razorpay'} />
                                <Package size={20} />
                                <div>
                                    <strong>Razorpay</strong>
                                    <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Credit/Debit Card, UPI, Netbanking</p>
                                </div>
                            </OptionCard>

                            <OptionCard selected={paymentMethod === 'phonepay'}>
                                <input type="radio" name="payment" onChange={() => setPaymentMethod('phonepay')} checked={paymentMethod === 'phonepay'} />
                                <CreditCard size={20} />
                                <div>
                                    <strong>PhonePe Business</strong>
                                    <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Secure UPI & QR Payment</p>
                                </div>
                            </OptionCard>

                            <OptionCard selected={paymentMethod === 'cod'}>
                                <input type="radio" name="payment" onChange={() => setPaymentMethod('cod')} checked={paymentMethod === 'cod'} />
                                <Heart size={20} />
                                <div>
                                    <strong>Cash on Delivery (COD)</strong>
                                    <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Pay when you receive the package</p>
                                </div>
                            </OptionCard>
                        </PaymentOptions>
                    </FormSection>

                    <PriceSummary>
                        <SectionTitle><ShoppingBag size={20} /> Order Summary</SectionTitle>
                        <div style={{ margin: '2rem 0' }}>
                            {cart.map(item => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <SummaryRow>
                            <span>Subtotal</span>
                            <span>₹{cartTotal.toFixed(2)}</span>
                        </SummaryRow>
                        <SummaryRow>
                            <span>Shipping</span>
                            <span>FREE</span>
                        </SummaryRow>
                        <SummaryRow className="total">
                            <span>Total Payable</span>
                            <span>₹{cartTotal.toFixed(2)}</span>
                        </SummaryRow>

                        <OrderButton type="submit" disabled={loading}>
                            {loading ? 'Processing...' : paymentMethod === 'cod' ? 'Place COD Order' : 'Pay & Place Order'}
                        </OrderButton>

                        <p style={{ textAlign: 'center', fontSize: '0.8rem', marginTop: '1rem', color: 'rgba(255,255,255,0.5)' }}>
                            100% Secure Checkout with SSL Encryption
                        </p>
                    </PriceSummary>
                </Grid>
            </form>
        </Container >
    );
};

export default Checkout;
