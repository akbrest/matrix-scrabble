import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import ErrorToast from "./ErrorToast";

function MainLayout() {
    return (
        <div>
            <ErrorToast />
            <Menu></Menu>
            <Outlet />
        </div>
    );
}

export default MainLayout;