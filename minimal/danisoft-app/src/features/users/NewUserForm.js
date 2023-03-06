import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import { Box, Card, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppTextField from "../../components/inputs/AppTextField";
import { H3 } from "../../components/Typography";
import { ROLES } from "../../config/roles";
import { useAddNewUserMutation } from "./usersApiSlice";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const NewUserForm = () => {
  //Function addNewUser
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  //States
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false); //When meet regex standars=> true
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]); //Default as Employee

  //Validations with useEffect
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  //Empty out all of the individual states trigger by isSuccess
  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]); //navigate back to our users LIST. Avoid warning by including navigate in here

  //Handlers
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  //We allow more than one option to be selected

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setRoles(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  //Save the user. can save: we create an array, check if all all them true/boolean method and check the loading status
  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  console.log("🚀 ~ file: NewUserForm.js:85 ~ NewUserForm ~ canSave:", canSave);
  //use can save value inside, call the addNweUser mutation, once call it, pass the username, password and role
  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      const userAdded = await addNewUser({ username, password, roles });
      console.log(
        "🚀 ~ file: NewUserForm.js:93 ~ onSaveUserClicked ~ userAdded:",
        userAdded
      );
    }
  };
  //Create the roles options for the dropdown menu
  /*   const options = Object.values(ROLES).map((role) => {
    return (
      <MenuItem key={role} value={role}>
        {" "}
        {role}
      </MenuItem>
    );
  }); */
  //Classes in case the form is incompleted. Red highlight
  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";
  const theme = useTheme();
  function getStyles(role) {
    return {
      fontWeight:
        roles.indexOf(role) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const content = (
    <Box pt={2} pb={4}>
      <Grid container spacing={3}>
        <Card
          sx={{
            padding: 3,
          }}
        >
          <p className={errClass}>{error?.data?.message}</p>
          <form sx={{ m: 1, width: 300 }} onSubmit={onSaveUserClicked}>
            <div className="form__title-row">
              <H3 mb={3}>Create a New User</H3>
              <Box display="flex" justifyContent="end" mb={3}>
                <button
                  aria-label="new"
                  className="icon-button"
                  title="Save"
                  disabled={!canSave}
                >
                  <SaveTwoToneIcon cursor="pointer" />
                </button>
              </Box>
            </div>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <AppTextField
                  label="Username"
                  value={username}
                  onChange={onUsernameChanged}
                />
              </Grid>
              {/* <label className="form__label" htmlFor="username">
                Username: <span className="nowrap">[3-20 letters]</span>
              </label> */}
              {/*      <input
                className={`form__input ${validUserClass}`}
                id="username"
                name="username"
                type="text"
                autoComplete="off"
                value={username}
                onChange={onUsernameChanged}
              /> */}
              <Grid item sm={6} xs={12}>
                <AppTextField
                  label="Password"
                  value={password}
                  onChange={onPasswordChanged}
                />
              </Grid>
              {/* <label className="form__label" htmlFor="password">
                Password:{" "}
                <span className="nowrap">[4-12 chars incl. !@#$%]</span>
              </label>
              <input
                className={`form__input ${validPwdClass}`}
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={onPasswordChanged}
              /> */}
              <Grid item sm={6} xs={12}>
                <InputLabel>Roles</InputLabel>
                <Select
                  multiple
                  value={roles}
                  onChange={handleChange}
                  MenuProps={MenuProps}
                >
                  {Object.values(ROLES).map((role) => (
                    <MenuItem key={role} value={role} style={getStyles(role)}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Grid>
    </Box>
  );

  return content;
};

export default NewUserForm;
