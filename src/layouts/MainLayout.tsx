import { Outlet } from "react-router-dom";
import Box from "../components/general/Box";
import Header from "../components/navbar/Header";
import Footer from "../components/navbar/Footer";

function MainLayout() {
  return (
    <Box flexDirection="column">
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
}

export default MainLayout;
