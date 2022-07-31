import setAuthToken from "./utils/setAuthToken";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./App.css";
import Home from "./Screens/Home/Home";
import PrivateRoute from "./Components/PrivateRoute";
import AuthRoutes from "./Routes/AuthRoutes";
import PostRoutes from "./Routes/PostRoutes";
import NotFound from "./Screens/NotFound";
// import Footer from "./Layouts/Footer/Footer";
import Alert from "./Components/Alert/Alert";
import Navbar from "./Layouts/Navbar/Navbar";
import ProfileRoutes from "./Routes/ProfileRoutes";
import { createConnection } from "./Actions/Socket/createConnection";
import NotificationPopup from "./Components/notificationPopup/NotificationPopup.component";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    socketConnection: { socket },
  } = useSelector((state) => state.socket);
  if (user) {
    setAuthToken(user.token);
  }
  useEffect(() => {
    if (socket && user) return;
    dispatch(createConnection());

    // close the socket connection when the component unmounts
    return () => {
      if (socket) {
        socket.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, dispatch]);
  return (
    <Router>
      <Container fluid>
        <Alert />
        <NotificationPopup />
        <Row>
          {user && (
            <Col lg={2} md={2} sm={1} xs={1} style={{ padding: "0px" }}>
              <Navbar user={user} />
            </Col>
          )}
          <Col lg={!user ? 12 : 8} md={10} xs={11} className="main">
            <Routes>
              <Route
                path="/dashboard/*"
                element={
                  <PrivateRoute>
                    <ProfileRoutes />
                  </PrivateRoute>
                }
              />
              <Route
                path="/post/*"
                element={
                  <PrivateRoute>
                    <PostRoutes />
                  </PrivateRoute>
                }
              />
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
              {/* <h1>stuff</h1> */}
            </Col>
          )}
          {/* <Footer /> */}
        </Row>
      </Container>
    </Router>
  );
}

export default App;
