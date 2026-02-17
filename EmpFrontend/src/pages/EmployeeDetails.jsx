import { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import API from "../api/api";
import { useParams } from "react-router-dom";

export default function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    API.get(`/employees/${id}`).then(res => {
      setEmployee(res.data);
    });
  }, [id]);

  const downloadCV = async () => {
    const res = await API.get(`/employees/${id}/cv`, {
      responseType: "blob"
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "employee-cv.pdf");
    document.body.appendChild(link);
    link.click();
  };

  if (!employee) return null;

  return (
    <Container>
      <Typography variant="h4">{employee.name}</Typography>
      <Typography>NID: {employee.nid}</Typography>
      <Typography>Phone: {employee.phone}</Typography>
      <Typography>Department: {employee.department}</Typography>

      {employee.spouse && (
        <>
          <Typography variant="h6" mt={2}>Spouse</Typography>
          <Typography>{employee.spouse.name}</Typography>
        </>
      )}

      <Typography variant="h6" mt={2}>Children</Typography>
      {employee.children?.map(child => (
        <Typography key={child.id}>
          {child.name} - {child.doB}
        </Typography>
      ))}

      <Button variant="outlined" sx={{ mt: 2 }} onClick={downloadCV}>
        Download CV PDF
      </Button>
    </Container>
  );
}
