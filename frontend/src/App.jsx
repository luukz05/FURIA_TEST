import { Routes, Route } from "react-router-dom";
import Home from "./index";
import Login from "./login";
import Cadastro from "./register";
import FanForm from "./preferences";
import SocialForm from "./socials";
import Furiometro from "./furiometroPROD";
import Dashboard from "./dashboard";
import Profile from "./profile";
import Quiz from "./quiz";
import StorePage from "./loja";
import Chat from "./chat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/fanform" element={<FanForm />} />
      <Route path="/furiometroPROD" element={<Furiometro />} />
      <Route path="/socials" element={<SocialForm />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/loja" element={<StorePage />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
