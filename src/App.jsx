import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Templates from "./pages/Templates";
import Dashboard from "./pages/Dashboard";
import CardEditor from "./pages/CardEditor";
import Analytics from "./pages/Analytics";
import LayoutWithHeaderFooter from "./layouts/LayoutWithHeaderFooter";
import LayoutWithSidebar from "./layouts/LayoutWithSidebar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
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
            <Route path="card-editor/:template" element={<CardEditor />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
