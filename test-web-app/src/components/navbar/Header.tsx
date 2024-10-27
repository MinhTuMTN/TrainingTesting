import {
  Avatar,
  Button,
  Card,
  Col,
  Flex,
  Image,
  Popover,
  Row,
  Typography,
} from "antd";
import styled from "styled-components";
import AppColors from "../../utils/AppColors";
import useAuth from "../../hooks/useAuth";
import { useMemo } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Container = styled(Row)`
  background-color: ${AppColors.background};
  padding: 8px 0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const Mid = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 70px;
`;

const MenuItem = styled(Typography.Text)`
  font-size: 1.2rem;
  color: ${AppColors.primary};
  text-align: center;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    color: ${AppColors.secondary};
  }
`;

const Right = styled(Flex)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 1rem;
  padding-right: 1rem;
  height: 100%;
`;

const PopoverItem = styled(Flex)`
  gap: 1rem;
  padding: 0.2rem 0.5rem;
  margin-bottom: 12px;
  cursor: pointer;
`;

function Header() {
  const auth = useAuth();
  const navigate = useNavigate();

  const fullName = useMemo(() => {
    const fullName = auth.fullName;

    return fullName.split(" ").slice(-2).join(" ");
  }, [auth.fullName]);

  const content = useMemo(
    () => (
      <>
        <Link
          to={"/update-account"}
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <PopoverItem>
            <UserOutlined />
            Tài khoản của tôi
          </PopoverItem>
        </Link>
        <Button type="primary" block onClick={auth.logout}>
          Logout
        </Button>
      </>
    ),
    [auth.logout]
  );
  return (
    <Container>
      <Col span={4}>
        <img
          onClick={() => {
            navigate("/");
          }}
          height={50}
          src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701497394/THEDUCK-removebg-preview_dla1rz.png"
        />
      </Col>
      <Mid span={16}>
        <MenuItem style={{ textAlign: "center" }}>Home</MenuItem>
        <MenuItem style={{ textAlign: "center" }}>Posts</MenuItem>
        <MenuItem style={{ textAlign: "center" }}>About</MenuItem>
        <MenuItem style={{ textAlign: "center" }}>Contact</MenuItem>
      </Mid>
      <Col span={4}>
        <Right>
          {auth.isAuth() ? (
            <>
              <Typography.Text
                style={{
                  fontSize: "1rem",
                }}
                id="welcome"
              >
                Xin chào, <strong>{fullName}</strong>
              </Typography.Text>
              <Popover
                content={content}
                placement="bottomRight"
                trigger={"click"}
              >
                <Avatar
                  size="large"
                  style={{
                    backgroundColor: AppColors.primary,
                    cursor: "pointer",
                  }}
                >
                  {fullName
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </Avatar>
              </Popover>
            </>
          ) : (
            <>
              <Button
                id="btn-login"
                type="primary"
                onClick={() => {
                  navigate("/login");
                }}
                style={{ marginRight: "1rem" }}
              >
                Login
              </Button>
              <Button
                id="btn-register"
                type="primary"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </Button>
            </>
          )}
        </Right>
      </Col>
    </Container>
  );
}

export default Header;
