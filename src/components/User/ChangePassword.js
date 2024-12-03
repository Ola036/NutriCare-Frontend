import React, { useState } from 'react';
import api from '../../services/api';
import { ENDPOINTS } from '../../config/constants';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            setErrorMessage("New password and confirmation do not match.");
            return;
        }

        const requestData = {
            current_password: currentPassword,
            new_password: newPassword,
            new_password_confirmation: confirmPassword,
        };

        api({
            url: ENDPOINTS.USER.CHANGE_PASSWORD,
            method: 'POST',
            body: requestData,
            onSuccess: () => {
                setSuccessMessage("Password changed successfully!");
                setErrorMessage('');
            },
            onError: (error) => {
                setErrorMessage(error.message || "Failed to change password.");
            },
        });
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundImage: `url('${process.env.PUBLIC_URL}/Image/background.svg')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            color: 'white',
            textAlign: 'center',
            padding: '2rem',
        }}>

            <div>
                <h2>Change Password</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    style={{ margin: '10px', padding: '10px', width: '80%', borderRadius: '5px' }}
                />
                <br />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{ margin: '10px', padding: '10px', width: '80%', borderRadius: '5px' }}
                />
                <br />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ margin: '10px', padding: '10px', width: '80%', borderRadius: '5px' }}
                />
                <br />
                <button
                    onClick={handleChangePassword}
                    style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', background: 'black', color: 'white', border: 'none' }}
                >
                    Change Password
                </button>
            </div>
        </div>
    );
};

export default ChangePassword;
