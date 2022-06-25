import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Home from "./Screens/Home/Home";

function App() {
  const { user } = useSelector((state) => state.auth);
  if (user) {
    setAuthToken(user.token);
  }
  return (
    <Router className="">
      <Container fluid>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
