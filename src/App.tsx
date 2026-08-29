import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import GameDetail from './GameDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:slug" element={<GameDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
