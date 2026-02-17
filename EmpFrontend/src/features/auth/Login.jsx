import { useState } from "react";
import { login } from "./authService";
import { TextField, Button, Container } from "@mui/material";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    const res = await login(form);
    localStorage.setItem("token", res.data.token);
    window.location.href = "/";
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={submit}>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <TextField
          type="password"
          fullWidth
          label="Password"
          margin="normal"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button variant="contained" fullWidth type="submit">
          Login
        </Button>
      </form>
    </Container>
  );
}
