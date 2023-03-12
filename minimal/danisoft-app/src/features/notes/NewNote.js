import { H1 } from "../../components/Typography";
import { useGetUsersQuery } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";

const NewNote = () => {
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length) return <H1>Loading Users</H1>;

  const content = <NewNoteForm users={users} />;

  return content;
};
export default NewNote;
