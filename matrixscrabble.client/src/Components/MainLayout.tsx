import { Outlet } from "react-router-dom";
import Menu from "./Menu";

function MainLayout() {
    return (
            <div>
                  <Menu></Menu>
                  <Outlet />
            </div>
  );
}

export default MainLayout;