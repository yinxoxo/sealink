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
import Deploy from "./pages/Deploy";
import LayoutWithHeaderFooter from "./layouts/LayoutWithHeaderFooter";
import LayoutWithSidebar from "./layouts/LayoutWithSidebar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AuthProvider } from "./contexts/AuthContext/AuthProvider";
import { ProjectsProvider } from "./contexts/ProjectContext/ProjectsProvider";
import PrivateRoute from "./components/PrivateRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import { CardEditorProvider } from "./contexts/CardEditorContext/CardEditorProvider";

import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
        <AuthProvider>
          <ProjectsProvider>
            <Router>
              <Routes>
                <Route path="/" element={<LayoutWithHeaderFooter />}>
                  <Route index element={<Home />} />
                  <Route path="templates" element={<Templates />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/sealink/:template/:projectId"
                  element={
                    <CardEditorProvider>
                      <Deploy />
                    </CardEditorProvider>
                  }
                />
                <Route
                  path="/dashboard"
                  element={<PrivateRoute element={<LayoutWithSidebar />} />}
                >
                  <Route
                    index
                    element={
                      <CardEditorProvider>
                        <Dashboard />
                      </CardEditorProvider>
                    }
                  />
                  <Route
                    path="card-editor/:template/:projectId?"
                    element={
                      <CardEditorProvider>
                        <CardEditor />
                      </CardEditorProvider>
                    }
                  />
                  <Route path="analytics" element={<Analytics />} />
                </Route>
              </Routes>
              <Toaster />
            </Router>
          </ProjectsProvider>
        </AuthProvider>
      </DndProvider>
    </QueryClientProvider>
  );
}

export default App;
