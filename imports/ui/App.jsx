import React, { createContext } from "react";
import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";
import Header from "./Header.jsx";
import Table from "./Table";
import Map from "./Map";

const App = () => (
  <Grid container direction="row">
    <Header />
    <Grid item xs={12}>
      <Map />
    </Grid>
    <Grid item xs={12}>
      <Table />
    </Grid>
  </Grid>
);

export default App;
