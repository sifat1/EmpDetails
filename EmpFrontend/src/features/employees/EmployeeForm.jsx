import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Stack,
  Typography
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEmployee,
  updateEmployee,
  getEmployee
} from "./employeeService";
import Navbar from "../../components/Navbar";

export default function EmployeeForm() {
  const [form, setForm] = useState({
    name: "",
    nid: "",
    phone: "",
    department: "",
    basicSalary: "",
    spouse: { name: "", nid: "" },
    children: []
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id).then(res => setForm(res.data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await updateEmployee(id, form);
    } else {
      await createEmployee(form);
    }

    navigate("/");
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          {id ? "Edit Employee" : "Create Employee"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />

            <TextField
              label="NID"
              value={form.nid}
              onChange={e => setForm({ ...form, nid: e.target.value })}
            />

            <TextField
              label="Phone"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />

            <TextField
              label="Department"
              value={form.department}
              onChange={e => setForm({ ...form, department: e.target.value })}
            />

            <TextField
              label="Basic Salary"
              type="number"
              value={form.basicSalary}
              onChange={e => setForm({ ...form, basicSalary: e.target.value })}
            />

            <Typography variant="h6">Spouse</Typography>

            <TextField
              label="Spouse Name"
              value={form.spouse?.name || ""}
              onChange={e =>
                setForm({
                  ...form,
                  spouse: { ...form.spouse, name: e.target.value }
                })
              }
            />

            <TextField
              label="Spouse NID"
              value={form.spouse?.nid || ""}
              onChange={e =>
                setForm({
                  ...form,
                  spouse: { ...form.spouse, nid: e.target.value }
                })
              }
            />

            <Button type="submit" variant="contained">
              Save
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
}
