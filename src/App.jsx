import Home from "./pages/Home";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Logout from "./pages/Logout";
import Mycart from "./pages/Mycart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./pages/Chekout";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/mycart" element={<Mycart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
      </Routes>
    </BrowserRouter>

  </>)}
export default App
