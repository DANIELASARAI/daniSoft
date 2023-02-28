import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { ButtonGroup, TableCell, TableRow } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectNoteById } from "./notesApiSlice";

const Note = ({ noteId }) => {
  const note = useSelector((state) => selectNoteById(state, noteId));

  const navigate = useNavigate();

  if (note) {
    const created = new Date(note.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const updated = new Date(note.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const handleEdit = () => navigate(`/dash/notes/${noteId}`);

    return (
      <TableRow>
        <TableCell>
          {note.completed ? (
            <span className="note__status--completed">Completed</span>
          ) : (
            <span className="note__status--open">Open</span>
          )}
        </TableCell>
        <TableCell>{created}</TableCell>
        <TableCell>{updated}</TableCell>
        <TableCell>{note.title}</TableCell>
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
export default Note;
