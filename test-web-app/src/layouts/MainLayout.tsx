import { Outlet } from "react-router-dom";
import Box from "../components/general/Box";
import Header from "../components/navbar/Header";

function MainLayout() {
  return (
    <Box
      flexDirection="column"
      width="100vw"
      styles={{
        rowGap: "1rem",
      }}
    >
      <Header />
      <Outlet />
    </Box>
  );
}

export default MainLayout;
