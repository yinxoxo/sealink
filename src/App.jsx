import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Templates from './pages/Templates';
import Dashboard from './pages/Dashboard';
import CardEditor from './pages/CardEditor';
import Analytics from './pages/Analytics';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';

function LayoutWithHeaderFooter() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function LayoutWithSidebar() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutWithHeaderFooter />}>
          <Route index element={<Home />} />
          <Route path="templates" element={<Templates />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<LayoutWithSidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="card-editor" element={<CardEditor />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
