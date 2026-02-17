import { AppBar, Toolbar, Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={() => navigate("/")}>
          Employee Registry
        </Button>

        {user?.role === "Admin" && (
          <Button color="inherit" onClick={() => navigate("/create")}>
            Add Employee
          </Button>
        )}

        <Button
          color="inherit"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
