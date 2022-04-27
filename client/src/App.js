import "./App.css";
import "./assets/css/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Operations from "./pages/Operations";
import Error404 from "./pages/Error404";
import Layout from "./pages/Layout";
import RequiredAuth from "./components/RequiredAuth";
import Additem from "./pages/AddItem.jsx";
import List from "./pages/List";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path={"/Register"} element={<Register />} />
                    <Route path={"/Login"} element={<Login />} />
                    <Route element={<RequiredAuth />}>
                        <Route path={"/Home"} element={<Home />} />
                        <Route path={"/Operation"} element={<Operations />} />
                        <Route path={"/AddItem"} element={<Additem />} />
                        <Route path={"/List"} element={<List />} />
                        <Route path="*" component={Error404} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
