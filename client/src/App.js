import "./App.css";
import "./Dark.css";
import setAuthToken from "./utils/setAuthToken";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Home from "./Screens/Home/Home";
import PrivateRoute from "./Components/PrivateRoute";
import AuthRoutes from "./Routes/AuthRoutes";
import NotFound from "./Screens/NotFound";
import Footer from "./Layouts/Footer/Footer";
import Alert from "./Components/Alert/Alert";
import Navbar from "./Layouts/Navbar/Navbar";

function App() {
  const { user } = useSelector((state) => state.auth);
  if (user) {
    setAuthToken(user.token);
  }
  return (
    <Router>
      <Container fluid>
        <Row>
          {user && (
            <Col lg={2} style={{ padding: "0px" }}>
              <Navbar />
            </Col>
          )}
          <Col lg={!user ? 12 : 6} md={10} className="main">
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
          </Col>
          {user && (
            <Col lg={4} md={2} className="d-none d-md-block">
              <h1>stuff</h1>
            </Col>
          )}
        </Row>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
