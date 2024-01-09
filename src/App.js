
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
  const[{ user }, dispatch] = useStateValue();
  
  
  return (
    <div className="bg-gray-300 h-screen grid place-items-center">
      {!user ? (
        <Login />
      ) : (
        <div className='-mt-[35px] flex h-[90vh] w-[90vw] bg-slate-200 shadow-[-1px_4px_20px_-6px_rgba(0,0,0,0.7)]'>
          <Sidebar />
          <Routes>
            <Route path="/rooms/:roomId" element={<Chat />} />
            <Route path="/" element={<Chat />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
