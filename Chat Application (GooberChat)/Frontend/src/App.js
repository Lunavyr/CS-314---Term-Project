import "./App.css";
import Frontpage from "./Pages/Frontpage";
import { Routes, Route } from "react-router-dom";
import ChatPage from "./Pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Frontpage/>} />
        <Route path="/chats" element={<ChatPage/>} />
      </Routes>
    </div>
  );
}

export default App;
