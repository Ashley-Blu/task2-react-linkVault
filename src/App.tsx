import { Routes, Route } from "react-router-dom";
import LandingPage from "./Components/Landing/Landing";
import SignUpPage from "./Components/SignUp/SignUp";
import LoginPage from "./Components/Login/Login";
import ForgotPassword from "./Components/Login/ForgotPassword";
import LinkPage from "./Components/LinkPage/LinkPage";
import AddLinkPage from "./Components/AddLinkPage/AddLinkPage";
import EditLinkPage from "./Components/EditLinkPage/EditLinkPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/linkpage" element={<LinkPage />} />
      <Route path="/addlinkpage" element={<AddLinkPage />} />
      <Route path="/editlinkpage/:linkId" element={<EditLinkPage />} />
    </Routes>
  );
}

export default App;
