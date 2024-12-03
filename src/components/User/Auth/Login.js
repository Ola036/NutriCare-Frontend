import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../../../config/constants';
import { useUser } from '../../../contexts/UserContext';
import api from '../../../services/api';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useUser();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [show2FA, setShow2FA] = useState(false);
  // const [code, setCode] = useState('');
  // const [twoFaKey, setTwoFaKey] = useState('');

  async function submit(e) {
    e.preventDefault();

    setErrors({});
    setLoading(true);

    api({
      url: ENDPOINTS.USER.AUTH.LOGIN,
      method: 'POST',
      body: {
        email,
        password,
      },
      onSuccess: (data, toast) => {
        login(data.user, data.token);
        toast.success('Logged in successfully!');

        if (data.user.has_TwoFA) {
          navigate('/2fa/confirm');
        } else {
          navigate('/');
        }
      },
      onError: (errors) => {
        setErrors(errors);
      },
      onEnd: () => {
        setLoading(false);
      },
    });
  }

  // async function confirm2FA(e) {
  //   e.preventDefault();

  //   setLoading(true);

  //   api({
  //     url: ENDPOINTS.USER.Verify_2FA,
  //     method: 'POST',
  //     body: {
  //       key: twoFaKey,
  //       code,
  //     },
  //     onSuccess: (data, toast) => {
  //       login(data.user, data.token);
  //       toast.success('2FA verified! Logged in successfully!');

  //       console.log(data.user.has_TwoFA);
  //       if(data.user.has_TwoFA) {
  //         navigate('/2fa/verify');
  //       } else {
  //         navigate('/');
  //       }
  //     },
  //     onError: (errors) => {
  //       setErrors({ twofa: 'Invalid 2FA code. Please try again.' });
  //     },
  //     onEnd: () => {
  //       setLoading(false);
  //     },
  //   });
  // }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: `url('/Image/background.svg')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      color: 'white',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <Container
        className="d-flex flex-column align-items-center justify-content-center"
      >
        {/* Title Section */}
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Your Personalized Recipe Generator</h1>
          <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
            Discover recipes tailored to your health and dietary preferences with NutriCare.
          </p>
        </div>

        {/* Login Form Section */}
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
              <Form onSubmit={submit}>
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

                <Form.Group id="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button disabled={loading} className="w-100 bg-dark" type="submit">
                  {loading ? 'Logging in...' : 'Log In'}
                </Button>
              </Form>

              <div className="w-100 text-center mt-3">
                <Link to="/forgot-password" style={{ color: '#007bff' }}>
                  Forgot Password?
                </Link>
              </div>
            </Card.Body>
          </Card>

          <div className="w-100 text-center mt-2">
            Need an account?{' '}
            <Link to="/register" style={{ color: '#007bff' }}>
              Register
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
