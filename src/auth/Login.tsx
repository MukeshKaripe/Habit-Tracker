import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContainer, StyledTextField, StyledButton, StyledLink } from '../commoStyles/CommonStyles';
import { toast } from 'react-toastify';
import { Box, Typography } from '@mui/material';
import { containerStyles } from '../commoStyles/CommonCSS';

const Login = ({ setIsAuthenticated }: any) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const loginData = JSON.parse(localStorage.getItem('loginData') || '[]');
  const [EmailError, setEmailError] = useState(credentials.email);
  const handleLogin = () => {
    const isValidUser = loginData.some(
      (user: any) =>
        user.email === credentials.email && user.password === credentials.password
    );

    if (isValidUser) {
      setIsAuthenticated(true);
      localStorage.setItem('loginS', 'true');
      navigate('/');
      toast.success('Login successful!');
    } else {
      toast.error('Invalid email or password!');
    }
  };
  useEffect(() => {
    console.log(loginData,'list');
    console.log(credentials,'entered');
    
    return () => {
        
    };
  }, []);

  return (
    <Box sx={containerStyles} className="p-4">
      <Box sx={{padding:'2rem'}}>
        <FormContainer>
          <Typography variant="h5">
            Login
          </Typography>
          <Box>
            <StyledTextField
              label="Email"
              type="email"
              value={credentials.email}
              error={!!EmailError}
              helperText={EmailError}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCredentials({...credentials,email:e.target.value})
              }
            />
            <StyledTextField
              label="Password"
              type="password"
              value={credentials.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCredentials({ ...credentials, password:e.target.value })
              }
            />
            <StyledButton onClick={handleLogin}>Login</StyledButton>
            <StyledLink href="/signup">Don't have an account? Create Account</StyledLink>
          </Box>
        </FormContainer>
      </Box>
    </Box>
  );
};

export default Login;
