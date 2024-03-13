import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link as RouterLink, } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import logo from './logo2.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { TextField, InputAdornment, Radio, FormControlLabel, Popover, List, ListItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';
import { UserManager } from 'oidc-client';

import { oidcConfig } from '../../constant';

const Navbar = () => {
  const { user, isAuthenticated, } = useAuth();
  const [language, setLanguage] = useState('english');
  const [anchorEl, setAnchorEl] = useState(null);
  const userManagers = new UserManager(oidcConfig);

  const handleLogout = async () => {
    debugger;
    console.log(userManagers);
    try {
      await userManagers.signoutRedirect();
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  useEffect(() => {
    console.log("user: ", user);
  }, [user]);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    handleClosePopover();
  };

  const handleLanguageIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'language-popover' : undefined;

  return (
    <>
      <style>
        {`
          .nav-link:hover {
            color: gray; 
          }

          .logout-button:hover,
          .login-button:hover,
          .signup-button:hover,
          .icon:hover {
            background-color: lightgray; 
          }
        `}
      </style>
      <AppBar position="static" color="inherit" sx={{ backgroundColor: '#fff', height: '120px' }}>
        <Toolbar>
          <div style={{ display: 'flex', marginRight: 'auto', marginBottom: '30px' }}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/become-seller"
              color="inherit"
              sx={{ color: '#000', marginRight: '16px', fontSize: '15px' }}
              className="nav-link"
            >
              Become a Seller
            </Typography>

            <Typography
              variant="h6"
              component={RouterLink}
              to="/affiliate-program"
              color="inherit"
              sx={{ color: '#000', marginRight: '16px', fontSize: '15px' }}
              className="nav-link"
            >
              MaxStore Affiliate Program
            </Typography>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/help-support"
              color="inherit"
              sx={{ color: '#000', marginRight: '16px', fontSize: '15px' }}
              className="nav-link"
            >
              Help & Support
            </Typography>

            <Typography
              variant="h6"
              component={RouterLink}
              to="/logistics-partner"
              color="inherit"
              sx={{ color: '#000', marginRight: '16px', fontSize: '15px' }}
              className="nav-link"
            >
              MaxStore Logistics Partner
            </Typography>
          </div>
        </Toolbar>
        <Toolbar>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              color="inherit"
              sx={{ flexGrow: 1, color: '#000', marginLeft: '40px', marginBottom: '30px' }}
              className="logo"
            >
              <img src={logo} alt="Logo" width="200" height="80" />
            </Typography>
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              sx={{
                width: '500px',
                height: '50px',
                marginTop: '10px',
                marginLeft: '250px'
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div style={{ display: 'flex', marginLeft: '150px' }}>
            <IconButton color="inherit" className='icon' component={RouterLink} to="/cart" sx={{ color: '#000', marginLeft: '50px', marginBottom: '20px' }}>
              <ShoppingCartIcon />
            </IconButton>
            {isAuthenticated ? (
              <Button color="inherit" variant="outlined" onClick={handleLogout} sx={{ color: '#000', marginLeft: '30px', marginBottom: '20px' }} className="logout-button">
                Logout
              </Button>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to="/login"
                  color="inherit"
                  variant="outlined"
                  startIcon={<PersonIcon />}
                  sx={{ color: '#000', marginLeft: '30px', marginBottom: '20px' }}
                  className="login-button"
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/signup"
                  color="inherit"
                  variant="outlined"
                  startIcon={<AccountCircleIcon />}
                  sx={{ color: '#000', marginLeft: '10px', marginBottom: '20px' }}
                  className="signup-button"
                >
                  Sign Up
                </Button>
              </>
            )}
            <div style={{ position: 'relative' }}>
              <IconButton color="inherit" aria-describedby={id} onClick={handleLanguageIconClick} sx={{ color: '#000', marginLeft: '30px' }} className="icon">
                <LanguageIcon />
              </IconButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <List>
                  <ListItem disablePadding>
                    <FormControlLabel
                      value="english"
                      control={<Radio color="primary" />}
                      label="English"
                      labelPlacement="start"
                      checked={language === 'english'}
                      onChange={handleLanguageChange}
                      style={{ margin: '0px 10px' }}
                    />
                  </ListItem>
                  <ListItem disablePadding>
                    <FormControlLabel
                      value="urdu"
                      control={<Radio color="primary" style={{ marginLeft: '20px' }} />}
                      label="Urdu"
                      labelPlacement="start"
                      checked={language === 'urdu'}
                      onChange={handleLanguageChange}
                      style={{ margin: '0px 10px' }}
                    />
                  </ListItem>
                </List>
              </Popover>
            </div>
            <IconButton
              color="inherit"
              component={RouterLink}
              to="/cart"
              sx={{ color: '#000', marginBottom: '20px', marginLeft: '10px' }}
              className="icon"
            >
              <ShoppingCartIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;