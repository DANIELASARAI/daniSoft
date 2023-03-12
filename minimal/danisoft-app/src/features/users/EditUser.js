import { useParams } from "react-router-dom";
import CircularIndeterminate from "../../utils/CircularProgress";

import EditUserForm from "./EditUserForm";
import { useGetUsersQuery } from "./usersApiSlice";

const EditUser = () => {
  const { id } = useParams();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });
  if (!user) return <CircularIndeterminate />;
  const content = <EditUserForm user={user} />;
  return content;
};
export default EditUser;
