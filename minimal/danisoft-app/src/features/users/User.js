import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { ButtonGroup, TableCell, TableRow } from "@mui/material";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";

const User = ({ userId }) => {
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

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
const memoizedUser = memo(User);

export default memoizedUser;
