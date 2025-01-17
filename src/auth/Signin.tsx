import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContainer, StyledTextField, StyledButton, StyledLink } from '../commoStyles/CommonStyles'; // Assuming you have these reusable components
import { Box, TextField, Typography } from '@mui/material';
import { containerStyles } from '../commoStyles/CommonCSS';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {};

const SignUp = () => {
    const [cred, setCred] = useState({ email: '', password: '', confirmpass: '' });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();

    // Validate Email
    const validateEmail = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return "Email cannot be empty.";
        }
        if (!emailPattern.test(email)) {
            return "Invalid email address.";
        }
        return "";
    };

    // Validate Password
    const validatePassword = (password: string) => {
        const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if (!password) {
            return "Password cannot be empty.";
        }
        // if (!passwordPattern.test(password)) {
        //     return "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.";
        // }
        return "";
    };

    // Validate Confirm Password
    const validateConfirmPassword = (confirmPassword: string, password: string) => {
        if (!confirmPassword) {
            return "Confirm password cannot be empty.";
        }
        if (confirmPassword !== password) {
            return "Passwords do not match.";
        }
        return "";
    };

    // Handle SignUp
    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();

        const emailError = validateEmail(cred.email);
        const passwordError = validatePassword(cred.password);
        const confirmPasswordError = validateConfirmPassword(cred.confirmpass, cred.password);

        // Set error states
        setErrors({
            email: emailError,
            password: passwordError,
            confirmPassword: confirmPasswordError,
        });

        // If no errors, proceed with sign up
        if (!emailError && !passwordError && !confirmPasswordError) {
            const existingUsers = JSON.parse(localStorage.getItem('loginData') || '[]');
            const updatedSign = [...existingUsers, { ...cred, id: Date.now().toString() }];
            localStorage.setItem('loginData', JSON.stringify(updatedSign));
            // Show success toast and delay navigation
            toast.success('Account Created successfully!', {
                position: 'top-right',
                autoClose: 3000, // Toast auto-close duration
            });

            // Delay navigation to allow toast to display
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
        else {
            toast.error('Incomplete details!', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    return (
        <Box sx={containerStyles}>
            <ToastContainer />
            <Box sx={{ padding: '2rem' }}>
                <FormContainer>
                    <Typography variant="h5" className="mb-6 text-center font-bold">
                        Sign Up
                    </Typography>
                    <form onSubmit={handleSignUp}>
                        <Box>
                            <TextField
                                label="Enter Email"
                                type="email"
                                value={cred.email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setCred({ ...cred, email: e.target.value })
                                }
                                sx={{ margin: '1rem 0' }}
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                            <TextField
                                label="Enter Password"
                                type="password"
                                value={cred.password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setCred({ ...cred, password: e.target.value })
                                }
                                sx={{ margin: '1rem 0' }}
                                fullWidth
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                            <TextField
                                label="Confirm Password"
                                type="password"
                                value={cred.confirmpass}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setCred({ ...cred, confirmpass: e.target.value })
                                }
                                sx={{ margin: '1rem 0' }}
                                fullWidth
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                            />
                            <StyledButton type="submit">Submit</StyledButton>
                        </Box>
                    </form>
                    <StyledLink href="/login">Already have an account? Login</StyledLink>
                </FormContainer>
            </Box>
        </Box>
    );
};

export default SignUp;
