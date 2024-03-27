import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import ErrorToast from "./ErrorToast";

function MainLayout() {
  return (
    <div>
      <Menu />
      <Outlet />
      <ErrorToast />
    </div>
  );
}

export default MainLayout;
