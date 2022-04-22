import "../App.css";
import "../assets/css/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Operations from "./Operations";
import Error404 from "./Error404";
import Header from "../components/Header";
function App() {
    return (
        <BrowserRouter>
            <div className="app_wrapper">
                <Header></Header>
                <Routes>
                    <Route path={"/"} exact={true} element={<Home></Home>} />
                    <Route
                        path={"/Register"}
                        exact={true}
                        element={<Register></Register>}
                    />
                    <Route
                        path={"/Login"}
                        exact={true}
                        element={<Login></Login>}
                    />
                    <Route
                        path={"/Operation"}
                        exact={true}
                        element={<Operations></Operations>}
                    />
                    <Route component={Error404} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
