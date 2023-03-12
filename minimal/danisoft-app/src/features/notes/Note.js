import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { ButtonGroup, TableCell, TableRow } from "@mui/material";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetNotesQuery } from "./notesApiSlice";
const Note = ({ noteId }) => {
  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  });
  console.log("🚀 ~ file: Note.js:9 ~ Note ~ note :", note);

  const navigate = useNavigate();

  if (note) {
    const created = new Date(note.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });
    console.log("🚀 ~ file: Note.js:15 ~ created ~ created:", created);

    const updated = new Date(note.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const handleEdit = () => navigate(`/dash/notes/${noteId}`);

    return (
      <TableRow>
        <TableCell>{note.title}</TableCell>
        <TableCell>
          {note.completed ? (
            <span className="note__status--completed">Completed</span>
          ) : (
            <span className="note__status--open">Open</span>
          )}
        </TableCell>
        <TableCell>{created}</TableCell>
        <TableCell>{updated}</TableCell>

        <TableCell>{note.username}</TableCell>
        <TableCell>
          <ButtonGroup
            className="icon-button table__button"
            onClick={handleEdit}
          >
            <EditTwoToneIcon cursor="pointer" />
          </ButtonGroup>
        </TableCell>
      </TableRow>
    );
  } else return null;
};
const memoizedNote = memo(Note); //Component rerender if data change

export default memoizedNote;
