import { useEffect, useState, useContext } from "react";
import { getEmployees, deleteEmployee } from "./employeeService";
import useDebounce from "../../hooks/useDebounce";
import Navbar from "../../components/Navbar";
import { AuthContext } from "../../context/AuthContext";
import {
  Table, TableBody, TableCell, TableHead,
  TableRow, TextField, Button, Container
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function EmployeeList() {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  const debounced = useDebounce(search, 400);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployees(debounced).then((res) => setEmployees(res.data));
  }, [debounced]);

  return (
    <>
      <Navbar />
      <Container>
        <TextField
          fullWidth
          label="Search Name, NID, Department"
          margin="normal"
          onChange={(e) => setSearch(e.target.value)}
        />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>NID</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {employees.map((e) => (
              <TableRow key={e.id}>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.nid}</TableCell>
                <TableCell>{e.department}</TableCell>
                <TableCell>{e.basicSalary}</TableCell>
                <TableCell>
                  <Button onClick={() => navigate(`/details/${e.id}`)}>
                    View
                  </Button>

                  {user?.role === "Admin" && (
                    <>
                      <Button onClick={() => navigate(`/edit/${e.id}`)}>
                        Edit
                      </Button>
                      <Button onClick={() => deleteEmployee(e.id)}>
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button
          variant="contained"
          onClick={() =>
            window.open(
              `https://localhost:5001/api/reports/list?search=${debounced}`
            )
          }
        >
          Export PDF
        </Button>
      </Container>
    </>
  );
}
