import Typography from "@mui/material/Typography";
import * as React from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import logo from "../../src/img/Software-Developer.png";

function Copyright() {
  return (
    <Typography variant="body2" borderColor={grey}>
      {"Copyright © "}
      DaniSoftVille {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));
const Public = () => {
  const content = (
    /*  <section className="public">
      <header>
        <Copyright />
      </header>
      <main className="public__main">
        <p>
          Located in Beautiful Downtown Foo City, Dan D. Repairs provides a
          trained staff ready to meet your tech repair needs.
        </p>
        <address className="public__addr">
          DaniSoftVille
          <br />
          Rua de Cepaes 321
          <br />
          Braga 4705-002
          <br />
          <a href="tel:+15555555555">932278369</a>
        </address>
        <br />
        <p>Owner: Luis Hernández</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section> */
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography
          variant="h3"
          fontFamily="nunito"
          component="h1"
          gutterBottom
        >
          DaniSoft
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="darkgrey">
          {
            " Located in Braga City, DaniSoft provides a trained staff ready to meet your tech repair needs."
          }
        </Typography>
        <StyledSection>
          <img src={logo} />
        </StyledSection>
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Link to="/login">
            <Typography variant="body1" fontFamily="nunito" color="blue">
              Login
            </Typography>
          </Link>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
  return content;
};
export default Public;
