import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
export default function Header() {
  return (
    <AppBar style={{marginBottom: ".5rem"}} position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Stroll
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
