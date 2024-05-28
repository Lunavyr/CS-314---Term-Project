import './App.css';
import { Routes,Route } from 'react-router-dom';
import Frontpage from './Pages/Frontpage';
import Chatpage from './Pages/ChatPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={Frontpage} />
        <Route path='/chats' Component={Chatpage} />
      </Routes>
    </div>);
}

export default App;
