import React, { useState } from 'react';
import styled from 'styled-components';
import { Calendar, Check, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { api } from '../services/api';

const FormContainer = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 10px;
`;

const Title = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  flex: 1;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme, error }) => error ? theme.colors.error : theme.colors.border};
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  background-color: ${({ theme, secondary }) => secondary ? theme.colors.gray[200] : theme.colors.primary};
  color: ${({ theme, secondary }) => secondary ? theme.colors.text : 'white'};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SummaryItem = styled.div`
  margin-bottom: 12px;
  font-size: 14px;
`;

const SuccessView = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.success};
`;

const ErrorMsg = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 12px;
  margin-top: 5px;
  text-align: center;
`;

const BookingForm = ({ onClose }) => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        petName: window.VetChatbotConfig?.petName || '',
        petOwnerName: window.VetChatbotConfig?.userName || '',
        phoneNumber: '',
        preferredDate: '',
        preferredTime: '10:00 AM',
        notes: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setError('');
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            await api.submitAppointment(formData);
            setSuccess(true);
            setTimeout(() => {
                onClose();
            }, 3000);
        } catch (err) {
            setError(err.message || 'Failed to book appointment');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <FormContainer>
                <SuccessView>
                    <div style={{ padding: 20, borderRadius: '50%', background: '#d4edda', marginBottom: 20 }}>
                        <Check size={40} />
                    </div>
                    <h3>Appointment Confirmed!</h3>
                    <p>We'll see {formData.petName} soon.</p>
                </SuccessView>
            </FormContainer>
        );
    }

    return (
        <FormContainer>
            <FormHeader>
                <Title><Calendar size={20} /> New Appointment</Title>
                <button onClick={onClose}><X size={20} /></button>
            </FormHeader>

            {step === 0 && (
                <FormGroup>
                    <Label>Your Name</Label>
                    <Input
                        value={formData.petOwnerName}
                        onChange={e => updateField('petOwnerName', e.target.value)}
                        placeholder="John Doe"
                        autoFocus
                    />
                    <div style={{ height: 16 }} />
                    <Label>Pet's Name</Label>
                    <Input
                        value={formData.petName}
                        onChange={e => updateField('petName', e.target.value)}
                        placeholder="Fluffy"
                    />
                </FormGroup>
            )}

            {step === 1 && (
                <FormGroup>
                    <Label>Phone Number</Label>
                    <Input
                        value={formData.phoneNumber}
                        onChange={e => updateField('phoneNumber', e.target.value)}
                        placeholder="123-456-7890"
                        autoFocus
                    />
                    <div style={{ height: 16 }} />
                    <Label>Reason/Notes</Label>
                    <Input
                        value={formData.notes}
                        onChange={e => updateField('notes', e.target.value)}
                        placeholder="Checkup, Vaccination..."
                    />
                </FormGroup>
            )}

            {step === 2 && (
                <FormGroup>
                    <Label>Preferred Date</Label>
                    <Input
                        type="date"
                        value={formData.preferredDate}
                        onChange={e => updateField('preferredDate', e.target.value)}
                    />
                    <div style={{ height: 16 }} />
                    <Label>Preferred Time</Label>
                    <Input
                        type="time" // fallback to text if needed for AM/PM strictness
                        value={formData.preferredTime}
                        onChange={e => updateField('preferredTime', e.target.value)} // Note: type=time returns HH:mm usually
                        placeholder="10:00 AM"
                    />
                </FormGroup>
            )}

            {step === 3 && (
                <FormGroup>
                    <Label>Confirm Details</Label>
                    <div style={{ background: '#f8f9fa', padding: 16, borderRadius: 8 }}>
                        <SummaryItem><strong>Owner:</strong> {formData.petOwnerName}</SummaryItem>
                        <SummaryItem><strong>Pet:</strong> {formData.petName}</SummaryItem>
                        <SummaryItem><strong>Contact:</strong> {formData.phoneNumber}</SummaryItem>
                        <SummaryItem><strong>When:</strong> {formData.preferredDate} at {formData.preferredTime}</SummaryItem>
                    </div>
                    {error && <ErrorMsg>{error}</ErrorMsg>}
                </FormGroup>
            )}

            <ButtonRow>
                {step > 0 ? (
                    <Button secondary onClick={prevStep}><ArrowLeft size={16} /> Back</Button>
                ) : <div />}

                {step < 3 ? (
                    <Button
                        onClick={nextStep}
                        disabled={
                            (step === 0 && (!formData.petOwnerName || !formData.petName)) ||
                            (step === 1 && !formData.phoneNumber) ||
                            (step === 2 && (!formData.preferredDate || !formData.preferredTime))
                        }
                    >
                        Next <ArrowRight size={16} />
                    </Button>
                ) : (
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Booking...' : 'Confirm Booking'}
                    </Button>
                )}
            </ButtonRow>
        </FormContainer>
    );
};

export default BookingForm;
