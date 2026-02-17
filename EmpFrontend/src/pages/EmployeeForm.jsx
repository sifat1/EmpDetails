import { useState, useEffect } from "react";
import { Container, TextField, Button } from "@mui/material";
import API from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

export default function EmployeeForm() {
  const [employee, setEmployee] = useState({
    name: "",
    nid: "",
    phone: "",
    department: "",
    basicSalary: ""
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      API.get(`/employees/${id}`).then(res => {
        setEmployee(res.data);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const save = async () => {
    if (id)
      await API.put(`/employees/${id}`, employee);
    else
      await API.post("/employees", employee);

    navigate("/employees");
  };

  return (
    <Container>
      <TextField name="name" label="Name" fullWidth margin="normal"
        value={employee.name} onChange={handleChange} />
      <TextField name="nid" label="NID" fullWidth margin="normal"
        value={employee.nid} onChange={handleChange} />
      <TextField name="phone" label="Phone" fullWidth margin="normal"
        value={employee.phone} onChange={handleChange} />
      <TextField name="department" label="Department" fullWidth margin="normal"
        value={employee.department} onChange={handleChange} />
      <TextField name="basicSalary" label="Basic Salary" fullWidth margin="normal"
        value={employee.basicSalary} onChange={handleChange} />

      <Button variant="contained" sx={{ mt: 2 }} onClick={save}>
        Save
      </Button>
    </Container>
  );
}
