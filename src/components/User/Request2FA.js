import React, { useState, useEffect } from 'react';
import api from '../../services/api'; // Adjust the import path if needed
import { ENDPOINTS } from '../../config/constants';
import { useNavigate } from 'react-router-dom'; // For navigation

export default function Request2FA() {
    const navigate = useNavigate(); // Use navigate for routing
    const [qrCodeImage, setQrCodeImage] = useState('');
    const [key, setKey] = useState('');
    const [message, setMessage] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEnable2FA = () => {
        api({
            url: ENDPOINTS.USER.ENABLE_2FA,
            method: 'POST',
            body: { key, code },
            onSuccess: () => {
                setSuccessMessage('2FA Enabled Successfully!');
                setErrorMessage('');
                navigate('/profile');
            },
            onError: (error) => {
                setErrorMessage('Failed to enable 2FA. Incorrect code.');
            }
        });
    };

    useEffect(() => {
        if (!qrCodeImage) {
            api({
                url: ENDPOINTS.USER.REQUEST_2FA,  // The endpoint for requesting 2FA
                method: 'POST',
                onSuccess: (response) => {
                    // Set the QR code image and key from the response
                    setKey(response.key);
                    setQrCodeImage(response.image);
                    setMessage('2FA request was successful. Please scan the QR code below.');
                    setError('');
                },
                onError: (err) => {
                    setError('Failed to request 2FA. Please try again.');
                    setMessage('');
                },
            });
        }
    });


    // const handleProceedToEnable2FA = () => {
    //     navigate('/2fa/enable', {
    //         state: { key }
    //     });
    // };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h3>Request Two-Factor Authentication (2FA)</h3>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* <div>
                <button onClick={handleRequest2FA} style={{ padding: '10px', margin: '10px' }}>
                    Request 2FA
                </button>
            </div> */}

            {qrCodeImage && (
                <div>
                    <h4>Scan this QR code with Google Authenticator:</h4>
                    <img src={qrCodeImage} alt="QR Code for 2FA" style={{ marginTop: '20px' }} />
                    <p>Key: {key}</p>
                    <hr />

                    <h3>Enable 2FA</h3>
                    <input
                        type="text"
                        placeholder="Enter the code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        style={{ margin: '10px' }}
                    />
                    <button onClick={handleEnable2FA}>Enable 2FA</button>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                </div>
            )}
        </div>
    );
}
