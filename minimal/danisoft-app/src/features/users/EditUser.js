import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditUserForm from "./EditUserForm";
import { selectUserById } from "./usersApiSlice";

const EditUser = () => {
  const { id } = useParams();

  const user = useSelector((state) => selectUserById(state, id)); //Memoize selector that we created inside of usersApiSlice

  const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>; //Render only if we have user data prepopulated, also we pass the user prop to the EditUserForm

  return content;
};
export default EditUser;
