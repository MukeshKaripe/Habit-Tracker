import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
export const FormContainer = ({ children }: { children: React.ReactNode }) => (
  <Box className="shadow-lg rounded-lg bg-white p-6 w-full max-w-md mx-auto">
    {children}
  </Box>
);

export const StyledTextField = ({ label, type, value, onChange }: any) => (
  <TextField
    variant="outlined"
    label={label}
    type={type}
    value={value}
    onChange={onChange}
   sx={{margin:'1rem 0'}}
   fullWidth
  />
);

export const StyledButton = ({ children, onClick, type }: any) => (
  <Button
    variant="contained"
    color="primary"
    fullWidth
    onClick={onClick}
    type={type}
    sx={{margin:'1rem 0'}}

  >
    {children}
  </Button>
);

export const StyledLink = ({ children, href }: any) => (
    <Link
    to={href} 
    style={{
      textDecoration: 'none',
      color: '#3f51b5', 
    }}
  >
    {children}
  </Link>
);
