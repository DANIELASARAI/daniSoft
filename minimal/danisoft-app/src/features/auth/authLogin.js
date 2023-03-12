import { useEffect, useRef, useState } from "react";
import { setCredentials } from "./authSlice";
// material-ui
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import usePersist from "../../hooks/usePersist";

// third party

// project import

import AnimateButton from "../../components/buttons/animatedButton";

// assets
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularIndeterminate from "../../utils/CircularProgress";
import { useLoginMutation } from "./authApiSlice";

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [persist, setPersist] = usePersist();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <CircularIndeterminate />;

  return (
    <>
      <p ref={errRef} className={errClass} aria-live="assertive">
        {errMsg}
      </p>

      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="username-login">
                <Typography
                  variant="body1"
                  sx={{ textDecoration: "none" }}
                  color="primary"
                >
                  Username
                </Typography>
              </InputLabel>
              <OutlinedInput
                id="username-login"
                type="text"
                ref={userRef}
                value={username}
                name="username"
                /*  onBlur={handleBlur} */
                onChange={handleUserInput}
                placeholder="Enter username"
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-login">
                <Typography
                  variant="body1"
                  sx={{ textDecoration: "none" }}
                  color="primary"
                >
                  Password
                </Typography>
              </InputLabel>
              <OutlinedInput
                fullWidth
                id="-password-login"
                type={showPassword ? "text" : "password"}
                value={password}
                name="password"
                /*    onBlur={handleBlur} */
                onChange={handlePwdInput}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? (
                        <VisibilityTwoToneIcon />
                      ) : (
                        <VisibilityOffTwoToneIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Enter password"
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <AnimateButton>
              <Button
                disableElevation
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </AnimateButton>
            <label htmlFor="persist" className="form__persist">
              <input
                type="checkbox"
                className="form__checkbox"
                id="persist"
                onChange={handleToggle}
                checked={persist}
              />
              Trust This Device
            </label>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AuthLogin;
