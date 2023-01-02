import { Spinner } from '@chakra-ui/react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Chats from './Pages/Chats';
import { ChatProvider } from './Context/chatContext';

function App() {
  return (
    <ChatProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>
      </div>
    </ChatProvider>
  );
}

export default App;
