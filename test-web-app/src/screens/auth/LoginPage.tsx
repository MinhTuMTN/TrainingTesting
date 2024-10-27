import { Button, Card, Col, Flex, Input, Row, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import AccountServices from "../../services/AccountServices";

const Container = styled(Row)`
  width: 100%;
  justify-content: center;
`;

const Label = styled(Typography.Text)`
  margin-right: 1rem;
  font-size: 1rem;
  flex: 1;
`;

const StyledInput = styled(Input)`
  flex: 5;
`;

const Form = styled(Flex)`
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email === "" || password === "") {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      const response = await AccountServices.login(email, password);
      const body = response.data.body;

      auth.login(body.token, body.fullName, body.email);
      navigate("/", {
        replace: true,
      });
    } catch (error: any) {
      console.log(error);
      if (error?.status == 400) {
        setErrorMessage("Email or password is incorrect");
      } else {
        setErrorMessage("An error occurred. Please check your network");
      }
    }
  };

  return (
    <Container>
      <Col span={12}>
        <Card>
          <Typography.Title style={{ textAlign: "center" }}>
            LOGIN
          </Typography.Title>

          {errorMessage && (
            <Typography.Text id="message" type="danger">
              {errorMessage}
            </Typography.Text>
          )}
          <Form id="login-form" vertical>
            <Flex>
              <Label>Email</Label>
              <StyledInput
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Flex>

            <Flex>
              <Label>Password</Label>
              <StyledInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
              />
            </Flex>

            <Button type="primary" onClick={handleLogin}>
              Login
            </Button>
          </Form>
        </Card>
      </Col>
    </Container>
  );
}

export default LoginPage;
