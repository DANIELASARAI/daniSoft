import PersonAddAlt1TwoTone from "@mui/icons-material/PersonAddAlt1TwoTone";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import CircularIndeterminate from "../../utils/CircularProgress";
import User from "./User";
import { useGetUsersQuery } from "./usersApiSlice";
const UsersList = () => {
  useTitle("daniSoft: Users List");
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <CircularIndeterminate />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = users;

    const tableContent =
      ids?.length && ids.map((userId) => <User key={userId} userId={userId} />);

    content = (
      <>
        <Box py={2}>
          <Link to="/dash/users/new">
            <IconButton aria-label="new">
              <PersonAddAlt1TwoTone />
            </IconButton>
          </Link>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell align="right">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableContent}</TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }

  return content;
};
export default UsersList;
