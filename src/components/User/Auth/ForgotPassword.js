import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ENDPOINTS } from '../../../config/constants';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [email, setEmail] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    setErrors({});
    setLoading(true);

    api({
      method: 'POST',
      url: ENDPOINTS.USER.AUTH.FORGOT_PASSWORD,
      body: {
        email
      },
      onSuccess: (data, toast) => {
        toast.success(data.message);
        localStorage.setItem('resetEmail', email);
        navigate('/reset-password');
      },
      onError: (errors) => {
        setErrors(errors);
      },
      onEnd: () => {
        setLoading(false);
      }
    });
  }

  return (
    <Container 
    
      className="d-flex align-items-center justify-content-center" style={{
        minHeight: '100vh',
        backgroundImage: `url('/Image/background.svg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '2rem',
      }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Forgot Password</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors.email}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Forgot Password
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/login">Back to Login</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}