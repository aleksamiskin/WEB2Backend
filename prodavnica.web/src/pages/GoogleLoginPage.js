import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Google from '../components/GoogleHelp';
import Typography from '@mui/material/Typography';
import {Link as RouterLink} from '@mui/material';
import { Link, useHistory } from 'react-router-dom';

function GoogleLoginPage() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <GoogleOAuthProvider clientId="462653387812-5bje13m23cikm208bivkcjmb9i4hu7t1.apps.googleusercontent.com">
          <Google />
        </GoogleOAuthProvider>
        <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
                Back to login? <RouterLink component={Link} to="/">Login</RouterLink>
        </Typography>
      </header>
    </div>
  );
}

export default GoogleLoginPage;