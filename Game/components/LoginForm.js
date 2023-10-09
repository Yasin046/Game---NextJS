import { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    const { username, password } = getValues();
    const response = await fetch(
      `http://localhost:8080/users?username=${username}&password=${password}`
    );
    const users = await response.json();
    if (users.length > 0) {
      localStorage.setItem("userId", users[0].id);
      alert("Login successful");
      router.push("/FAQ");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <div className="formBox col-md-6 rounded-3">
          <Form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="fw-bold">Login</h2>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <Form.Text className="text-danger">
                  Username is required.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...register("password", { required: true, minLength: 3 })}
              />
              {errors.password && errors.password.type === "required" && (
                <Form.Text className="text-danger">
                  Password is required.
                </Form.Text>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <Form.Text className="text-danger">
                  Password must be at least 3 characters.
                </Form.Text>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </Row>
    </Container>
  );
}

export default LoginForm;
