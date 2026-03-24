import './styles/global.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicView from './pages/PublicView';
import AppView from './pages/AppView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicView />} />
        <Route path="/app" element={<AppView />} />
      </Routes>
    </Router>
  );
}

export default App;