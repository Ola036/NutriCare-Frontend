import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ENDPOINTS } from '../../../config/constants';
import api from '../../../services/api';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [email] = useState(localStorage.getItem('resetEmail') || '');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    setErrors({});
    setLoading(true);

    api({
      method: 'POST',
      url: ENDPOINTS.USER.AUTH.RESET_PASSWORD,
      body: {
        email,
        code,
        password,
        password_confirmation: passwordConfirmation
      },
      onSuccess: (data, toast) => {
        toast.success(data.message);
        localStorage.removeItem('resetEmail');
        navigate('/login');
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
    <Container className="d-flex align-items-center justify-content-center" style={{
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
            <h2 className="text-center mb-4">Reset Password</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  disabled
                  required
                  value={email}
                  isInvalid={!!errors.email}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group id="code" className="mb-3">
                <Form.Label>Code</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  isInvalid={!!errors.code}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.code}
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

              <Form.Group id="password_confirmation" className="mb-3">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  isInvalid={!!errors.passwordConfirmation}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.passwordConfirmation}
                </Form.Control.Feedback>
              </Form.Group>

              <Button disabled={loading} className="w-100" type="submit">
                Reset Password
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