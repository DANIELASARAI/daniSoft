import { useTheme } from "@emotion/react";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppTextField from "../../components/inputs/AppTextField";
import { H3 } from "../../components/Typography";
import { ROLES } from "../../config/roles";
import { useDeleteUserMutation, useUpdateUserMutation } from "./usersApiSlice";
console.log("🚀 ~ file: EdituSERfORM.JS:19 ~  ROLES:", ROLES);

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
const EditUserForm = ({ user }) => {
  //We can call these functions inside whenever we need them
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active); //Default value of active, to change it or disable an active inside of the form

  //Check validations
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  //We have two mutations now isSuccess is for update and isDelSuccess for the delete
  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  //Handlers
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setRoles(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const onActiveChanged = () => setActive((prev) => !prev); //Either active false or true

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active });
    } else {
      await updateUser({ id: user.id, username, roles, active });
    }
  };

  const onDeleteUserClicked = async () => {
    //Pass the id to the mutation
    await deleteUser({ id: user.id });
  };

  let canSave; //if password is true, canSave use that valid password inside the array
  if (password) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass =
    password && !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? ""; //Whether we have an error.data or a delete. The content will be empty if we got null error
  const theme = useTheme();
  function getStyles(role) {
    return {
      fontWeight:
        roles.indexOf(role) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const options = Object.values(ROLES).map((role) => (
    <MenuItem key={role} value={role} style={getStyles(role)}>
      {role}
    </MenuItem>
  ));
  console.log(
    "🚀 ~ file: EdituSERfORM.JS:134 ~ EditUserForm ~ options:",
    options
  );
  const content = (
    <Box pt={2} pb={4}>
      <Grid container spacing={3}>
        <Card
          sx={{
            padding: 3,
          }}
        >
          <p className={errClass}>{errContent}</p>

          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <div className="form__title-row">
              <H3 pt={2}>Edit User</H3>
              <Box display="flex" justifyContent="end" mb={5}>
                <button
                  aria-label="new"
                  className="icon-button"
                  title="Save"
                  onClick={onSaveUserClicked}
                  disabled={!canSave}
                >
                  <SaveTwoToneIcon cursor="pointer" />
                </button>
                <button
                  className="icon-button"
                  title="Delete"
                  onClick={onDeleteUserClicked}
                >
                  <DeleteTwoToneIcon cursor="pointer" />
                </button>
              </Box>
            </div>
            <Grid container spacing={2} display="flex">
              <Grid item sm={6} xs={12}>
                <AppTextField
                  label="Username"
                  value={username}
                  onChange={onUsernameChanged}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppTextField
                  label="Password"
                  value={password}
                  onChange={onPasswordChanged}
                />
              </Grid>
            </Grid>
            {/* <label className="form__label" htmlFor="username">
              Username: <span className="nowrap">[3-20 letters]</span>
            </label>
            <input
              className={`form__input ${validUserClass}`}
              id="username"
              name="username"
              type="text"
              autoComplete="off"
              value={username}
              onChange={onUsernameChanged}
            /> */}

            {/*    <label className="form__label" htmlFor="password">
              Password: <span className="nowrap">[empty = no change]</span>{" "}
              <span className="nowrap">[4-12 chars incl. !@#$%]</span>
            </label> */}

            <Box display="flex" justifyContent="space-between" mt={3}>
              {/*     <input
                cursor="pointer"
                className="form__checkbox"
                id="user-active"
                name="user-active"
                type="checkbox"
                checked={active}
                onChange={onActiveChanged}
              /> */}

              <FormControlLabel
                value="start"
                control={<Checkbox />}
                label="Active"
                labelPlacement="start"
                checked={active}
                onChange={onActiveChanged}
              />
              <Grid item sm={6} xs={12}>
                <InputLabel>Roles</InputLabel>
                <Select
                  multiple
                  fullWidth
                  value={roles}
                  onChange={handleChange}
                  MenuProps={MenuProps}
                >
                  {options}
                </Select>
              </Grid>
            </Box>

            {/*       <label className="form__label" htmlFor="roles">
              ASSIGNED ROLES:
            </label>
            <select
              id="roles"
              name="roles"
              className={`form__select ${validRolesClass}`}
              multiple={true}
              size="3"
              value={roles}
              onChange={handleChange}
            >
              {options}
            </select> */}
          </form>
        </Card>
      </Grid>
    </Box>
  );

  return content;
};
export default EditUserForm;
