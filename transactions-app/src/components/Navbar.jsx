import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

export default function Navbar() {
    return (
      <AppBar position="static" color="primary" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Get Dal Technical Assessment
          </Typography>
        </Toolbar>
      </AppBar>
    );
}