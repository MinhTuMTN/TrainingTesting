import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useLayoutEffect } from "react";

interface ProtectedPageProps {
  isProtected: boolean;
}
function ProtectedPage(props: ProtectedPageProps) {
  const { isProtected = true } = props;

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isProtected && auth.isAuth()) {
      navigate("/");
    } else if (isProtected && !auth.isAuth()) {
      navigate("/login");
    }
  }, [isProtected, auth, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default ProtectedPage;
