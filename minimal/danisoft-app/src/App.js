import { Route, Routes } from "react-router-dom";
import DashLayout from "./components/DashLayout";

import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import Welcome from "./features/auth/Welcome";

import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import UsersList from "./features/users/UsersList";

import Prefetch from "./features/auth/Prefetch";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import NotesList from "./features/notes/NotesList";

import PersistLogin from "./features/auth/PersistLogin";
function App() {
  return (
    <Routes>
      {/* We got 2 public routes, Public and Login, after that, we gonna protect the rest of routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route path="dash" element={<DashLayout />}>
              <Route index element={<Welcome />} />
              <Route path="users">
                <Route index element={<UsersList />} />
                <Route path=":id" element={<EditUser />} />
                <Route path="new" element={<NewUserForm />} />
              </Route>
              <Route path="notes">
                <Route index element={<NotesList />} />
                <Route path=":id" element={<EditNote />} />
                <Route path="new" element={<NewNote />} />
              </Route>
            </Route>
            {/* End Dash */}
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
