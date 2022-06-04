import { Container, Grid } from "@mui/material";
import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <Container>
      <Grid container alignItems="center" justifyContent={"center"}>
        <Grid container alignItems={"center"} direction={"column"}>
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Loader;
