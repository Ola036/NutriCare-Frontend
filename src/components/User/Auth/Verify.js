import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import { ENDPOINTS } from '../../../config/constants';
import { useUser } from '../../../contexts/UserContext';

const Verify = () => {
  const { user } = useUser();
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleVerify = () => {
    api({
      url: ENDPOINTS.USER.AUTH.VERIFY,
      method: 'POST',
      body: { code, email: user.email },
      onSuccess: () => {
        navigate('/');
      },
      onError: (error) => {
        setErrorMessage('Invalid code. Please try again.');
      }
    });
  };

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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h3 className="display-4" style={{ color: 'Black', fontWeight: 'bold', marginBottom: '1rem' }}>Verify Your Account</h3>
          <input
            type="text"
            placeholder="Enter the code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ marginBottom: '5rem' }}
          />
          <button onClick={() => handleVerify()} style={{ marginBottom: '5rem' }}>Verify</button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Verify;
