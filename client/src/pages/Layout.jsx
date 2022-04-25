import { Outlet } from "react-router-dom";
import Header from "../components/Header";
const Layout = () => {
    return (
        <div className="app_wrapper">
            <Header></Header>
            <div className="home_wrapper">
                <div className="home_container">
                    <div className="home_block">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
