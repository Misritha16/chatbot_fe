import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import ChatWithPdf from "./Pages/ChatWithPdf/ChatWithPdf";
import ChatBot from "./Pages/ChatBot/ChatBot";

function App() {
  return (
    <div className="" style={{ height: "100vh" }}>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path={"/chat_with_pdf"} element={<ChatWithPdf />} />
        <Route path={"/chat_bot"} element={<ChatBot />} />
      </Routes>
    </div>
  );
}

export default App;
