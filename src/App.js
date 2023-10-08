import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main, Register, Login } from "./pages/index";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
