import { useTheme } from "@emotion/react";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import { Card, Grid, InputLabel } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppTextField from "../../components/inputs/AppTextField";
import { H3 } from "../../components/Typography";
import { useAddNewNoteMutation } from "./notesApiSlice";

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

const NewNoteForm = ({ users }) => {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(users[0].username);

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewNote({ user: userId, title, text });
    }
  };

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.username}>
        {" "}
        {user.username}
      </option>
    );
  });
  console.log("🚀 ~ file: NewNoteForm.js:62 ~ options ~ users:", users);
  const errClass = isError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";
  const theme = useTheme();
  function getStyles(user) {
    return {
      fontWeight:
        users.indexOf(user) === -1
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

          <form className="form" onSubmit={onSaveNoteClicked}>
            <H3>Create a new Note</H3>
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
            {/* <div className="form__action-buttons">
                <button
                  className="icon-button"
                  title="Save"
                  disabled={!canSave}
                >
                  <FontAwesomeIcon icon={faSave} />
                </button>
              </div> */}
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <AppTextField
                  label="Title"
                  value={title}
                  onChange={onTitleChanged}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <AppTextField
                  label="Text"
                  value={text}
                  onChange={onTextChanged}
                />
              </Grid>
              {/* <label className="form__label" htmlFor="text">
                Text:
              </label>
              <textarea
                className={`form__input form__input--text ${validTextClass}`}
                id="text"
                name="text"
                value={text}
                onChange={onTextChanged}
              /> */}
              <Grid item sm={6} xs={12}>
                <InputLabel>Assigned to:</InputLabel>
                <select
                  id="username"
                  name="username"
                  className="form__select"
                  onChange={onUserIdChanged}
                >
                  {options}
                </select>
              </Grid>
            </Grid>
            {/*  <label className="form__label" htmlFor="title">
              Title:
            </label>
            <input
              className={`form__input ${validTitleClass}`}
              id="title"
              name="title"
              type="text"
              autoComplete="off"
              value={title}
              onChange={onTitleChanged}
            /> */}
          </form>
        </Card>
      </Grid>
    </Box>
  );

  return content;
};

export default NewNoteForm;
