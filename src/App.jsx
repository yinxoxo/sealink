import { Toaster } from "@/components/ui/toaster";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext/AuthProvider";
import { CardEditorProvider } from "./contexts/CardEditorContext/CardEditorProvider";
import { ProjectsProvider } from "./contexts/ProjectContext/ProjectsProvider";
import LayoutWithHeaderFooter from "./layouts/LayoutWithHeaderFooter";
import LayoutWithSidebar from "./layouts/LayoutWithSidebar";
import Analytics from "./pages/Analytics";
import CardEditor from "./pages/CardEditor";
import Dashboard from "./pages/Dashboard";
import Deploy from "./pages/Deploy";
import Home from "./pages/Home";
import ProjectAnalysis from "./pages/ProjectAnalysis";
import SignUp from "./pages/SignUp";
import Templates from "./pages/Templates";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
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
                    path="/sealink/:token"
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
                    <Route
                      path="analytics/:projectId"
                      element={<ProjectAnalysis />}
                    />
                  </Route>
                </Routes>
                <Toaster />
              </Router>
            </ProjectsProvider>
          </AuthProvider>
        </DndProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
