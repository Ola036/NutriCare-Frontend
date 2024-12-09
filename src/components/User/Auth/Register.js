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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  async function submit(e) {
    e.preventDefault();

    setErrors({});
    setLoading(true);

    api(
      {
        url: ENDPOINTS.USER.AUTH.REGISTER,
        method: 'POST',
        body: {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation
        },
        onSuccess: (data, toast) => {
          login(data.user, data.token);
          toast.success('Registered successfully!');
          navigate('/verify');
        },
        onError: (errors) => {
          setErrors(errors);
        },
        onEnd: () => {
          setLoading(false);
        }
      }
    );
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Register</h2>
            <Form onSubmit={submit}>
              <Form.Group id="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isInvalid={!!errors.name}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

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

              <Form.Group id="password_confirmation" className="mb-3">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  isInvalid={!!errors.password_confirmation}
                />
              </Form.Group>

              <Button disabled={loading} className="w-100" type="submit">
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </Form>

            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>

        <div className="w-100 text-center mt-2">
          Has an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </Container>
  )
}

