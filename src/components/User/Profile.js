import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // For navigation
import { useUser } from '../../contexts/UserContext';
import api from '../../services/api';
import { ENDPOINTS } from '../../config/constants';

export default function Profile() {
  const { user, login } = useUser();
  const navigate = useNavigate(); // Use navigate for routing
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hasTwoFA, setHasTwoFA] = useState('');
  const [healthConditions, setHealthConditions] = useState([]);
  const [dietaryPreferences, setDietaryPreferences] = useState([]);
  const [availableHealth, setAvailableHealth] = useState([]);
  const [availableDietary, setAvailableDietary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDisable2FA = () => {
    api({
      url: ENDPOINTS.USER.DISABLE_2FA,
      method: 'POST',
      onSuccess: () => {
        setHasTwoFA(false);
      },
      onError: (error) => {
        setErrorMessage('Failed to disable 2FA.');
      }
    });
  };

  // Fetch user profile and available options on component mount
  useEffect(() => {
    // Fetch user profile data
    api({
      url: ENDPOINTS.USER.PROFILE,
      method: 'GET',
      onSuccess: (data) => {
        setName(data.name);
        setEmail(data.email);
        setHealthConditions(data.health_conditions || []);
        setDietaryPreferences(data.dietary_preferences || []);
        setHasTwoFA(data.has_TwoFA);
      },
      onError: () => {
        setErrorMessage('Failed to load user information.');
      },
    });

    // Fetch available health conditions and dietary preferences
    api({
      url: ENDPOINTS.USER.DATA,
      method: 'GET',
      onSuccess: (data) => {
        setAvailableHealth(data.health || []);
        setAvailableDietary(data.dietary || []);
      },
      onError: () => {
        setErrorMessage('Failed to load options for health and dietary preferences.');
      },
    });
  }, []);

  const handleSave = () => {
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const updatedData = {
      name,
      email,
      health_conditions: healthConditions,
      dietary_preferences: dietaryPreferences,
    };

    api({
      url: ENDPOINTS.USER.PROFILE,
      method: 'PUT',
      body: updatedData,
      onSuccess: (data) => {
        setSuccessMessage('Profile updated successfully!');
        login(data.user, localStorage.getItem('token')); // Update user context
      },
      onError: (error) => {
        setErrorMessage(error.message || 'Failed to update profile.');
      },
      onEnd: () => {
        setLoading(false);
      },
    });
  };

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        backgroundImage: `url('/Image/background.svg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding: '2rem',
      }}
    >
      <Card className="p-4 shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
        <Card.Body>
          <h3 className="text-center mb-4">User Information</h3>
          {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}
          {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Health Conditions</Form.Label>
              <Select
                isMulti
                value={healthConditions.map((condition) => ({ value: condition, label: condition }))}
                onChange={(selected) => setHealthConditions(selected.map((item) => item.value))}
                options={availableHealth.map((condition) => ({ value: condition, label: condition }))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dietary Preferences</Form.Label>
              <Select
                isMulti
                value={dietaryPreferences.map((preference) => ({ value: preference, label: preference }))}
                onChange={(selected) => setDietaryPreferences(selected.map((item) => item.value))}
                options={availableDietary.map((preference) => ({ value: preference, label: preference }))}
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button
                onClick={handleSave}
                disabled={loading}
                style={{ backgroundColor: 'black', border: 'none', marginRight: '10px' }}
              >
                {loading ? 'Saving...' : 'Save Changes'}

              </Button>
              <Button
                onClick={() => navigate('/change-password')}
                style={{ backgroundColor: 'black', border: 'none', marginLeft: '10px' }}
              >
                Change Password

              </Button>
              {
                !hasTwoFA ?
                  <Button
                    onClick={() => navigate('/2fa/request')}
                    style={{ backgroundColor: 'black', border: 'none', marginLeft: '10px' }}
                  >
                    Enable 2FA
                  </Button> :
                  <Button
                    onClick={() => handleDisable2FA()}
                    style={{ backgroundColor: 'black', border: 'none', marginLeft: '10px' }}
                  >
                    Disable 2FA
                  </Button>
              }
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
