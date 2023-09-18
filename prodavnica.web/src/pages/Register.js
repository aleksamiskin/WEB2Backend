import React, { useState } from 'react';
import { Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Link as RouterLink } from '@mui/material';
import Api from '../services/userApi';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    dateOfBirth: '',
    address: '',
    userType: 'buyer',
    image: 'null',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  const userTypeInt = formData.userType === 'buyer' ? 0 : 1;
  const veri = formData.userType === 'buyer' ? true : false;

  const formDataWithIntUserType = {
    ...formData,
    userType: userTypeInt,
    verified: veri,
    id: uuidv4(),
  };


  Api.RegisterUser(formDataWithIntUserType)
  .then((response) => {
  })
  .catch((error) => {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    } else {
      console.error('Axios error:', error);
    }
  });
    console.log('Form data submitted:', formData);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" color="primary" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Full Name"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Date of Birth"
          type="text"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Address"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          margin="normal"
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>User Type</InputLabel>
          <Select
            label="User Type"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
          >
            <MenuItem value="buyer">Buyer</MenuItem>
            <MenuItem value="seller">Seller</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Register
        </Button>
      </form>
      <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
        Already have an account? <RouterLink component={Link} to="/">Login</RouterLink>
      </Typography>
    </Container>
  );
};

export default Register;