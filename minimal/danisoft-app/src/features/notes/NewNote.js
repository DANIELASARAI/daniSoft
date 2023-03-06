import { useSelector } from "react-redux";
import CircularIndeterminate from "../../utils/CircularProgress";
import { selectAllUsers } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";

const NewNote = () => {
  const users = useSelector(selectAllUsers);

  const content = users ? (
    <NewNoteForm users={users} />
  ) : (
    <CircularIndeterminate />
  ); //If we have users from the state, then, we are ready to create a note prepopulated with user data, otherwise we get loading.

  return content;
};
export default NewNote;
