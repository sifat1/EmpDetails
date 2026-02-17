import { useState, useEffect, useMemo, useContext } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { debounce } from "lodash";
import API from "../api/api";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(AuthContext);

  const fetchEmployees = async (term = "") => {
    const res = await API.get(`/employees/search?term=${term}`);
    setEmployees(res.data);
  };

  const debouncedSearch = useMemo(
    () => debounce(fetchEmployees, 400),
    []
  );

  useEffect(() => {
    debouncedSearch(search);
    return () => debouncedSearch.cancel();
  }, [search]);

  const downloadPdf = async () => {
    const res = await API.get(`/employees/export?term=${search}`, {
      responseType: "blob"
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "employees.pdf");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Container>
      <Typography variant="h4" mt={3}>Employees</Typography>

      <TextField
        fullWidth
        label="Search by Name, NID, Department"
        margin="normal"
        onChange={(e) => setSearch(e.target.value)}
      />

      {user?.role === "Admin" && (
        <Button component={Link} to="/employees/create"
          variant="contained" sx={{ mr: 2 }}>
          Add Employee
        </Button>
      )}

      <Button variant="outlined" onClick={downloadPdf}>
        Export PDF
      </Button>

      {employees.map(emp => (
        <div key={emp.id} style={{ marginTop: "10px" }}>
          <Link to={`/employees/${emp.id}`}>
            {emp.name} - {emp.department}
          </Link>
        </div>
      ))}
    </Container>
  );
}
