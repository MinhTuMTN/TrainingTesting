import { Button, Flex, Input, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledContainer = styled(Flex)`
  height: 100vh;
  justify-content: center;
`;
const StyledForm = styled(Flex)`
  min-width: 50vw;
`;
const StyledFormItem = styled.div`
  margin-bottom: 1rem;

  display: flex;
`;
const StyledLabel = styled(Typography.Text)`
  margin-right: 1rem;
  flex: 1;
`;
const StyledInput = styled(Input)`
  flex: 4;
`;

function RegisterPage() {
  const [info, setInfo] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigate();

  const handleNavigateSuccessPage = () => {
    navigation("/success");
  };

  const handleRegister = () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }

    fetch("http://tuyetvi-testing.ddns.net:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: info.fullName,
        email: info.email,
        password: info.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.success === false) {
          setErrorMessage(data.message);
        } else {
          handleNavigateSuccessPage();
        }
      })
      .catch((error) => {
        console.log(error);

        alert("An error occurred. Please try again later.");
      });
  };

  const validateForm = () => {
    if (info.fullName === "") {
      return "Full name is required";
    }
    if (info.email === "") {
      return "Email is required";
    }
    if (info.password === "") {
      return "Password is required";
    }
    if (info.password !== info.confirmPassword) {
      return "Passwords do not match";
    }

    // Validate email with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(info.email)) {
      return "Invalid email";
    }

    return "";
  };
  return (
    <StyledContainer>
      <StyledForm vertical>
        <Typography.Title
          style={{
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Register
        </Typography.Title>

        {errorMessage && (
          <Flex id="message">
            <Typography.Text style={{ color: "red", marginBottom: "12px" }}>
              {errorMessage}
            </Typography.Text>
          </Flex>
        )}
        <Flex vertical id="form">
          <StyledFormItem>
            <StyledLabel>Full name</StyledLabel>
            <StyledInput
              value={info.fullName}
              onChange={(e) =>
                setInfo((prev) => {
                  return { ...prev, fullName: e.target.value };
                })
              }
            />
          </StyledFormItem>

          <StyledFormItem>
            <StyledLabel>Email</StyledLabel>
            <StyledInput
              value={info.email}
              onChange={(e) =>
                setInfo((prev) => {
                  return { ...prev, email: e.target.value };
                })
              }
            />
          </StyledFormItem>

          <StyledFormItem>
            <StyledLabel>Password</StyledLabel>
            <StyledInput
              type="password"
              value={info.password}
              onChange={(e) =>
                setInfo((prev) => {
                  return { ...prev, password: e.target.value };
                })
              }
            />
          </StyledFormItem>

          <StyledFormItem>
            <StyledLabel>Confirm Password</StyledLabel>
            <StyledInput
              type="password"
              value={info.confirmPassword}
              onChange={(e) =>
                setInfo((prev) => {
                  return { ...prev, confirmPassword: e.target.value };
                })
              }
            />
          </StyledFormItem>
        </Flex>
        <Button type="primary" onClick={handleRegister}>
          Register
        </Button>
      </StyledForm>
    </StyledContainer>
  );
}

export default RegisterPage;
