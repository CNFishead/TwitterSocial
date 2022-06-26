import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Home from "./Screens/Home/Home";
import PrivateRoute from "./Components/PrivateRoute";
import AuthRoutes from "./Routes/AuthRoutes";
import NotFound from "./Screens/NotFound";
import Footer from "./Layouts/Footer";
import Alert from "./Components/Alert/Alert";

function App() {
  const { user } = useSelector((state) => state.auth);
  if (user) {
    setAuthToken(user.token);
  }
  return (
    <Router>
      <Container fluid className="main">
        <Alert />
        <Routes>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
