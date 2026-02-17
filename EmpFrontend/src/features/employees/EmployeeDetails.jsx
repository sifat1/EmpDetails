import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem
} from "@mui/material";
import { getEmployee } from "./employeeService";
import Navbar from "../../components/Navbar";

export default function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    getEmployee(id).then(res => setEmployee(res.data));
  }, [id]);

  if (!employee) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4">{employee.name}</Typography>
        <Typography>NID: {employee.nid}</Typography>
        <Typography>Phone: {employee.phone}</Typography>
        <Typography>Department: {employee.department}</Typography>
        <Typography>Salary: {employee.basicSalary}</Typography>

        {employee.spouse && (
          <>
            <Typography variant="h6" sx={{ mt: 3 }}>
              Spouse
            </Typography>
            <Typography>{employee.spouse.name}</Typography>
            <Typography>{employee.spouse.nid}</Typography>
          </>
        )}

        {employee.children?.length > 0 && (
          <>
            <Typography variant="h6" sx={{ mt: 3 }}>
              Children
            </Typography>
            <List>
              {employee.children.map(child => (
                <ListItem key={child.id}>
                  {child.name} - {child.doB}
                </ListItem>
              ))}
            </List>
          </>
        )}

        <Button
          sx={{ mt: 3 }}
          variant="contained"
          onClick={() =>
            window.open(
              `https://localhost:5025/api/reports/cv/${employee.id}`
            )
          }
        >
          Export CV PDF
        </Button>
      </Container>
    </>
  );
}
