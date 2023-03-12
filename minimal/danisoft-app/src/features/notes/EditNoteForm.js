import { useTheme } from "@emotion/react";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppTextField from "../../components/inputs/AppTextField";
import { H3 } from "../../components/Typography";
import useAuth from "../../hooks/useAuth";
import { useDeleteNoteMutation, useUpdateNoteMutation } from "./notesApiSlice";
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
const EditNoteForm = ({ note, users }) => {
  console.log("🚀 ~ file: EditNoteForm.js:33 ~ EditNoteForm ~ note:", note);
  const { isManager, isAdmin } = useAuth();
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();

  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);
  const [userId, setUserId] = useState(note.username);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onCompletedChanged = (e) => setCompleted((prev) => !prev);

  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e) => {
    if (canSave) {
      await updateNote({ id: note.id, user: userId, title, text, completed });
    }
  };

  const onDeleteNoteClicked = async () => {
    await deleteNote({ id: note.id });
  };
  const style = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };

  const created = new Date(note.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(note.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";
  const theme = useTheme();
  function getStyles(user) {
    return {
      fontWeight:
        users.indexOf(user) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {" "}
        {user.username}
      </option>
    );
  });
  let deleteButton = null;
  if (isManager || isAdmin) {
    {
      deleteButton = (
        <button
          className="icon-button"
          title="Delete"
          onClick={onDeleteNoteClicked}
        >
          <DeleteTwoToneIcon cursor="pointer" />
        </button>
      );
    }
  }
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
              <H3>Edit Note #{note.ticket}</H3>
              <Box display="flex" justifyContent="end" mb={5}>
                <button
                  aria-label="new"
                  className="icon-button"
                  title="Save"
                  onClick={onSaveNoteClicked}
                  disabled={!canSave}
                >
                  <SaveTwoToneIcon cursor="pointer" />
                </button>
                {deleteButton}
              </Box>
            </div>

            <Grid container spacing={2} display="flex">
              {/*  <label className="form__label" htmlFor="note-title">
                Title:
              </label>
              <input
                className={`form__input ${validTitleClass}`}
                id="note-title"
                name="title"
                type="text"
                autoComplete="off"
                value={title}
                onChange={onTitleChanged}
              /> */}
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

              {/* <label className="form__label" htmlFor="note-text">
                Text:
              </label>
              <textarea
                className={`form__input form__input--text ${validTextClass}`}
                id="note-text"
                name="text"
                value={text}
                onChange={onTextChanged}
              /> */}
            </Grid>
            <div className="form__row">
              {/* <div className="form__divider">
                <label
                  className="form__label form__checkbox-container"
                  htmlFor="note-completed"
                >
                  WORK COMPLETE:
                  <input
                    className="form__checkbox"
                    id="note-completed"
                    name="completed"
                    type="checkbox"
                    checked={completed}
                    onChange={onCompletedChanged}
                  />
                </label>

                <label
                  className="form__label form__checkbox-container"
                  htmlFor="note-username"
                >
                  ASSIGNED TO:
                </label>
                <select
                  id="note-username"
                  name="username"
                  className="form__select"
                  value={userId}
                  onChange={onUserIdChanged}
                >
                  {options}
                </select>
              </div> */}
              <Box display="flex" justifyContent="space-between" mt={3}>
                <List sx={style} component="nav" aria-label="mailbox folders">
                  <ListItem>
                    <FormControlLabel
                      value="start"
                      control={<Checkbox />}
                      label="Active"
                      labelPlacement="start"
                      checked={completed}
                      onChange={onCompletedChanged}
                    />
                  </ListItem>
                  <ListItem>
                    <InputLabel>Assigned to:</InputLabel>
                    <select
                      id="note-username"
                      name="username"
                      className="form__select"
                      value={userId}
                      onChange={onUserIdChanged}
                    >
                      {options}
                    </select>
                  </ListItem>
                </List>
                {/*     <List sx={style} component="nav" aria-label="mailbox folders">
                  <ListItem>
                    <ListItemText primary="Created at:" secondary={created} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary="Updated at:" secondary={updated} />
                  </ListItem>
                </List> */}
              </Box>
              <div className="form__divider">
                <p className="form__created">
                  Created:
                  <br />
                  {created}
                </p>
                <p className="form__updated">
                  Updated:
                  <br />
                  {updated}
                </p>
              </div>
            </div>
          </form>
        </Card>
      </Grid>
    </Box>
  );

  return content;
};

export default EditNoteForm;
