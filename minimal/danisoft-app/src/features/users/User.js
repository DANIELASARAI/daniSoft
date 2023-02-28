import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { ButtonGroup, TableCell, TableRow } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserById } from "./usersApiSlice";

const User = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    const userRolesString = user.roles.toString().replaceAll(",", ", ");

    const cellStatus = user.active ? "" : "table__cell--inactive";

    return (
      <TableRow>
        <TableCell align="left">{user.username}</TableCell>
        <TableCell align="center">{userRolesString}</TableCell>
        <TableCell align="right">
          <ButtonGroup onClick={handleEdit}>
            <EditTwoToneIcon cursor="pointer" />
          </ButtonGroup>
        </TableCell>
      </TableRow>
    );
  } else return null;
};
export default User;
