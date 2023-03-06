import { useParams } from "react-router-dom";
import CircularIndeterminate from "../../utils/CircularProgress";
import { useGetUsersQuery } from "../users/usersApiSlice";
import EditNoteForm from "./EditNoteForm";
import { useGetNotesQuery } from "./notesApiSlice";

const EditNote = () => {
  const { id } = useParams();

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  const content =
    note && users ? (
      <EditNoteForm note={note} users={users} />
    ) : (
      <CircularIndeterminate />
    );

  return content;
};
export default EditNote;
