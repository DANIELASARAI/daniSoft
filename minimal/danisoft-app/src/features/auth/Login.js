import { Link } from "react-router-dom";

import { Grid, Stack, Typography } from "@mui/material";

import MainCard from "../../components/MainCard";
import { H2 } from "../../components/Typography";

import AuthLogin from "./authLogin";

import AuthWrapper from "./authWrapper";

const Login = () => {
  const content = (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <H2>Login</H2>
            <Typography
              component={Link}
              to="/register"
              variant="body1"
              sx={{ textDecoration: "none" }}
              color="primary"
            >
              Don&apos;t have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <MainCard>
            <AuthLogin />
          </MainCard>
        </Grid>
      </Grid>
    </AuthWrapper>
  );

  return content;
};

export default Login;
